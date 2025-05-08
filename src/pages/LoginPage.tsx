import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '../hooks/useLogin';
import { LoginForm } from '../components/forms/LoginForm';

export const LoginPage: React.FC = () => {
    const { signInWithGithub } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, errorMsg, isLoading } = useLogin();

    return (
        <div className="h-[calc(100vh-8rem)] bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="max-w-md mx-auto p-6 border border-amber-800 shadow-lg rounded bg-offwhite">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-red-800">
                            Welcome Back!
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Please sign in to your account
                        </p>
                    </div>

                    <LoginForm
                        email={email}
                        password={password}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                        onSubmit={() => login(email, password)}
                        onGithubSignIn={signInWithGithub}
                        errorMsg={errorMsg}
                        isLoading={isLoading}
                    />

                    <p className="mt-6 text-center text-sm">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-red-600 underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};