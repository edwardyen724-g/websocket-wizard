import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { title, content, framework } = req.body;

      if (!title || !content || !framework) {
        return res.status(400).json({ message: 'Title, content, and framework are required.' });
      }

      const { data, error } = await supabase
        .from('templates')
        .insert([{ title, content, framework, user_id: req.user?.id }]);

      if (error) {
        throw new Error(error.message);
      }

      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;