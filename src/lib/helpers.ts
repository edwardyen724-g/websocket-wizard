import { Database } from '../lib/database.types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const fetchUserData = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw new Error(error.message);

        return data;
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
    }
};

export const createPaymentIntent = async (amount: number, currency: string) => {
    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        return paymentIntent;
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
    }
};

export const handleWebSocketConnection = () => {
    const connections = new Map<string, WebSocket>();

    return {
        connect: (id: string, socket: WebSocket) => {
            connections.set(id, socket);
        },
        disconnect: (id: string) => {
            const socket = connections.get(id);
            if (socket) {
                socket.close();
                connections.delete(id);
            }
        },
        getConnection: (id: string) => connections.get(id),
    };
};