import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}

const rateLimit = new Map<string, number>();
const RATE_LIMIT = 5; // allow 5 requests per minute

const createTemplate = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const key = `${req.method}-${userId}`;
  const currentTime = Date.now();
  const requestCount = rateLimit.get(key) || 0;

  if (requestCount >= RATE_LIMIT) {
    return res.status(429).json({ message: 'Too Many Requests' });
  }

  try {
    const { title, description, framework } = req.body;

    const { data, error } = await supabase
      .from('templates')
      .insert([{ user_id: userId, title, description, framework }]);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    rateLimit.set(key, requestCount + 1);
    setTimeout(() => {
      rateLimit.set(key, requestCount);
    }, 60000);

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default createTemplate;