import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
  credential: applicationDefault(),
};

initializeApp(firebaseAdminConfig);
const db = getFirestore();

interface GuideRequest extends NextApiRequest {
  user?: { uid: string };
}

const guidesCache = new Map<string, any>();

export default async function handler(req: GuideRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const cacheKey = 'integration_guides';
    if (guidesCache.has(cacheKey)) {
      return res.status(200).json(guidesCache.get(cacheKey));
    }

    const guidesSnapshot = await db.collection('guides').get();
    const guides = guidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    guidesCache.set(cacheKey, guides);

    return res.status(200).json(guides);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}