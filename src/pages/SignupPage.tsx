import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useSignup } from '../hooks/useSignup';
import { SignupForm } from '../components/forms/SignupForm';

export const SignupPage: React.FC = () => {
    const { signInWithGithub } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup, errorMsg, isLoading } = useSignup();

    return (
        <div className="h-[calc(100vh-8rem)] bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="max-w-md mx-auto p-6 border border-amber-800 shadow-lg rounded bg-offwhite">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-red-800">
                            Create an Account
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Sign up to get started
                        </p>
                    </div>

                    <SignupForm
                        email={email}
                        password={password}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                        onSubmit={() => signup(email, password)}
                        onGithubSignUp={signInWithGithub}
                        errorMsg={errorMsg}
                        isLoading={isLoading}
                    />

                    <p className="mt-6 text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-red-600 underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
