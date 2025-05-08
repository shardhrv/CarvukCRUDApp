import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { AuthError } from '@supabase/supabase-js';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
    const { signInWithEmail } = useAuth();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function login(email: string, password: string) {
        setErrorMsg(null);
        setIsLoading(true);

        try {
            const { error } = await signInWithEmail(email, password);
            if (error) {
                setErrorMsg(error.message);
            } else {
                navigate('/home');
            }
        } catch (err) {
            setErrorMsg((err as AuthError).message);
        } finally {
            setIsLoading(false);
        }
    }

    return { login, errorMsg, isLoading };
}