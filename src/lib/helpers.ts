import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js/src/lib/SupabaseClient';

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const initializeStripe = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error('Stripe publishable key is not defined');
    }
    // Initialize Stripe here using the publishable key if needed
};

export const logError = (error: unknown) => {
    console.error(err instanceof Error ? err.message : String(err));
};

export const handleApiError = (error: unknown): string => {
    return err instanceof Error ? err.message : String(err);
};

// Function to validate WebSocket URL format
export const isValidWebSocketUrl = (url: string): boolean => {
    const pattern = /^wss?:\/\/[^\s/$.?#].[^\s]*$/;
    return pattern.test(url);
};