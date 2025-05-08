import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { AuthError } from '@supabase/supabase-js';
import { useAuth } from '../context/AuthContext';

export function useSignup() {
    const { signUpWithEmail } = useAuth();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function signup(email: string, password: string) {
        setErrorMsg(null);
        setIsLoading(true);

        try {
            const { error } = await signUpWithEmail(email, password);
            if (error) {
                setErrorMsg(error.message);
            } else {
                navigate('/login');
            }
        } catch (err) {
            setErrorMsg((err as AuthError).message);
        } finally {
            setIsLoading(false);
        }
    }

    return { signup, errorMsg, isLoading };
}