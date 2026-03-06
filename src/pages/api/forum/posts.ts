import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import firebaseAdminCredentials from '../../../path/to/credentials.json';

interface AuthedRequest extends NextApiRequest {
  uid?: string;
}

initializeApp({
  credential: cert(firebaseAdminCredentials),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = getFirestore();
const auth = getAuth();

const rateLimit = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

export default async function handler(
  req: AuthedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const key = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (key && rateLimit.has(key as string)) {
    const { count, timestamp } = rateLimit.get(key as string)!;

    if (Date.now() - timestamp < RATE_LIMIT_WINDOW) {
      if (count >= RATE_LIMIT_MAX_REQUESTS) {
        return res.status(429).json({ message: 'Too Many Requests' });
      }
      rateLimit.set(key as string, { count: count + 1, timestamp });
    } else {
      rateLimit.set(key as string, { count: 1, timestamp: Date.now() });
    }
  } else {
    rateLimit.set(key as string, { count: 1, timestamp: Date.now() });
  }

  try {
    const { title, content } = req.body;

    if (!req.uid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const post = {
      title,
      content,
      author: req.uid,
      createdAt: new Date(),
    };

    await db.collection('forumPosts').add(post);
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}