import { withSentryConfig } from '@sentry/nextjs';

export default withSentryConfig(
  {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
      serverActions: true,
    },
    images: {
      domains: ['your-image-domain.com'],
    },
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    },
  },
  {
    // Additional Sentry config options can be added here
    silent: true, // Suppresses all Sentry logging
  }
);