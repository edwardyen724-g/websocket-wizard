import React from 'react';
import { useSupabase } from '../lib/supabase';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Page: React.FC = () => {
  const { user, signOut } = useSupabase();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold text-center">
        Integrate WebSocket and tanStack seamlessly — Boost your development speed today!
      </h1>
      <p className="mt-4 text-lg text-center">
        Streamline WebSocket and tanStack integrations for modern web developers.
      </p>
      <section className="mt-8">
        <h2 className="text-3xl font-semibold">MVP Features</h2>
        <ul className="mt-4 list-disc list-inside">
          <li>Step-by-step integration guide for WebSocket support within popular frameworks.</li>
          <li>Library configuration templates for tanStack API integration.</li>
          <li>Live code snippets that adapt as developers input their specific requirements.</li>
          <li>Error handling suggestions and common pitfalls explained.</li>
          <li>Community forum for peer support and sharing best practices.</li>
        </ul>
      </section>
      {user ? (
        <button
          className="mt-6 px-4 py-2 text-white bg-red-600 rounded"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
            const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
            handleLogin(email, password);
          }}
        >
          <input type="email" name="email" placeholder="Email" required className="p-2 border border-gray-300 rounded" />
          <input type="password" name="password" placeholder="Password" required className="mt-2 p-2 border border-gray-300 rounded" />
          <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-600 rounded">
            Sign In
          </button>
        </form>
      )}
    </main>
  );
};

export default Page;