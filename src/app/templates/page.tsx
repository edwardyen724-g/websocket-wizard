import React from 'react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const WebSocketWizardPage: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*');

      if (error) throw new Error(error.message);
      setTemplates(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Integrate WebSocket and tanStack seamlessly</h1>
      <p>Boost your development speed today!</p>
      <h2>MVP Features</h2>
      <ul>
        <li>Step-by-step integration guide for WebSocket support.</li>
        <li>Library configuration templates for tanStack API integration.</li>
        <li>Live code snippets that adapt to your requirements.</li>
        <li>Error handling suggestions and common pitfalls explained.</li>
        <li>Community forum for peer support and sharing best practices.</li>
      </ul>
      <h2>Available Templates</h2>
      <ul>
        {templates.map(template => (
          <li key={template.id}>{template.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketWizardPage;