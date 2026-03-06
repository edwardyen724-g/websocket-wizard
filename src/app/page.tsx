import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { useSupabase } from '@/lib/supabaseClient';

const Page: React.FC = () => {
  const { user } = useSupabase();

  const handleGetStarted = async () => {
    if (!user) {
      // Handle signing in or prompting for authentication
      console.log('User is not authenticated. Prompt for sign-in.');
      return;
    }
    // Redirect or direct the user to the integration guide
    console.log('Redirecting to integration guide...');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">
          Integrate WebSocket and tanStack seamlessly
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Boost your development speed today!
        </p>
      </header>
      <section className="max-w-3xl text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          WebSocket Wizard
        </h2>
        <p className="text-lg text-gray-600">
          Streamline WebSocket and tanStack integrations for modern web developers.
        </p>
      </section>
      <Button onClick={handleGetStarted} className="bg-blue-600 text-white">
        Get Started
      </Button>
      <section className="mt-12 max-w-2xl text-left">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          MVP Features
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Step-by-step integration guide for WebSocket support within popular frameworks.</li>
          <li>Library configuration templates for tanStack API integration.</li>
          <li>Live code snippets that adapt as developers input their specific requirements.</li>
          <li>Error handling suggestions and common pitfalls explained.</li>
          <li>Community forum for peer support and sharing best practices.</li>
        </ul>
      </section>
      <footer className="mt-12">
        <Image src="/logo.svg" alt="WebSocket Wizard Logo" width={120} height={40} />
      </footer>
    </main>
  );
};

export default Page;