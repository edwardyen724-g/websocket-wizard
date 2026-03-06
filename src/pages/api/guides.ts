import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { verifyIdToken } from 'lib/auth'; // A hypothetical auth module to verify tokens

const app = initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS as string)),
});

const db = getFirestore(app);

interface AuthedRequest extends NextApiRequest {
  uid?: string;
}

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const decodedToken = await verifyIdToken(token);
    req.uid = decodedToken.uid;

    const guidesSnapshot = await db.collection('guides').get();
    const guides = guidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return res.status(200).json(guides);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}