import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

interface AuthedRequest extends NextApiRequest {
  uid?: string; // Add any other custom properties here as needed
}

const rateLimit = new Map<string, number>();

const rateLimitMiddleware = (req: AuthedRequest, res: NextApiResponse, next: () => void) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const currentTime = Date.now();

  if (rateLimit.has(ip as string)) {
    const lastRequestTime = rateLimit.get(ip as string);
    if (currentTime - lastRequestTime < 10000) { // 10 seconds rate limit
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
  }

  rateLimit.set(ip as string, currentTime);
  next();
};

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  rateLimitMiddleware(req, res, () => {});
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const postsRef = admin.firestore().collection('forumPosts');
    const newPost = await postsRef.add({ title, content, createdAt: admin.firestore.FieldValue.serverTimestamp() });

    return res.status(201).json({ id: newPost.id, title, content });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;