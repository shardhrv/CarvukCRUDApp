import { useState, useEffect } from 'react';
import { supabase } from '../util/supabase-client';
import { useAuth } from '../context/AuthContext';

export function useProfile() {
    const { user, signOut } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.user_metadata?.full_name ?? '');
            setEmail(user.email ?? '');
        }
    }, [user]);

    async function save() {
        if (!user) return;
        setErrorMsg(null);
        setLoading(true);
        const { error } = await supabase.auth.updateUser({
            email,
            data: { full_name: name }
        });
        if (error) {
            setErrorMsg(error.message);
        } else {
            setEditMode(false);
        }
        setLoading(false);
    }

    return {
        name,
        email,
        editMode,
        loading,
        errorMsg,
        setName,
        setEmail,
        setEditMode,
        save,
        signOut
    };
}