import { defineConfig } from 'next';

export default defineConfig({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  images: {
    domains: ['your-image-domain.com'], // Update with your allowed image domains
  },
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
});