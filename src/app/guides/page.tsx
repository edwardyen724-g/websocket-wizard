import React from 'react';
import { useEffect, useState } from 'react';

const GuidesPage: React.FC = () => {
  const [guides, setGuides] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch('/api/guides');
        if (!response.ok) {
          throw new Error('Failed to fetch guides');
        }
        const data = await response.json();
        setGuides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) {
    return <div>Loading guides...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>
        Integrate WebSocket and tanStack seamlessly — Boost your development speed today!
      </h1>
      <p>
        Streamline WebSocket and tanStack integrations for modern web developers.
      </p>
      <h2>MVP Features</h2>
      <ul>
        <li>Step-by-step integration guide for WebSocket support within popular frameworks.</li>
        <li>Library configuration templates for tanStack API integration.</li>
        <li>Live code snippets that adapt as developers input their specific requirements.</li>
        <li>Error handling suggestions and common pitfalls explained.</li>
        <li>Community forum for peer support and sharing best practices.</li>
      </ul>
      <h2>Guides</h2>
      <ul>
        {guides.map((guide, index) => (
          <li key={index}>{guide}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuidesPage;