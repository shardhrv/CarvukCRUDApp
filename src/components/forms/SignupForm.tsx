import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface Props {
    email: string;
    password: string;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: () => void;
    onGithubSignUp: () => void;
    errorMsg: string | null;
    isLoading: boolean;
}

export const SignupForm: React.FC<Props> = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onGithubSignUp,
    errorMsg,
    isLoading
}) => (
    <form onSubmit={e => { e.preventDefault(); onSubmit(); }} className="space-y-4">
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
        />

        <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => onPasswordChange(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
        />

        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-400 hover:bg-red-800 text-white text-base font-semibold py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-200 disabled:opacity-50 transition-colors duration-200 rounded-lg"
        >
            {isLoading ? 'Creating…' : 'Sign Up'}
        </button>

        <button
            type="button"
            onClick={onGithubSignUp}
            className="w-full flex items-center justify-center py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 text-white text-base font-semibold shadow-md transition-colors duration-200 rounded-lg"
        >
            <FaGithub className="mr-2" size={20} />
            Sign up with GitHub
        </button>
    </form>
);