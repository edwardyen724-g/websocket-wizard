import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabaseUrl, supabaseAnonKey } from '@/lib/supabase';
import { WebSocketIntegrationGuide, TanStackTemplates, LiveCodeSnippets, ErrorHandlingGuide, CommunityForum } from '@/components/templates';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TemplatesPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Integrate WebSocket and tanStack seamlessly — Boost your development speed today!</h1>
      <p>Streamline WebSocket and tanStack integrations for modern web developers.</p>
      
      <WebSocketIntegrationGuide />
      <TanStackTemplates />
      <LiveCodeSnippets />
      <ErrorHandlingGuide />
      <CommunityForum user={user} />
    </div>
  );
};

export default TemplatesPage;