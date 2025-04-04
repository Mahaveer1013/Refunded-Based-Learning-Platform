import { useState } from 'react';
import GmailLogin from '../components/ui/auth/GmailLogin';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-text)]">
                    {isLogin ? 'Sign in to your account' : 'Create a new account'}
                </h2>
                <p className="mt-2 text-center text-sm text-[var(--color-text-light)]">
                    {isLogin ? (
                        <>
                            Or{' '}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="font-medium cursor-pointer hover:underline text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                            >
                                register for free
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="font-medium cursor-pointer hover:underline text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-[var(--shadow-md)] sm:rounded-lg sm:px-10">
                    <GmailLogin isLogin={isLogin} />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;