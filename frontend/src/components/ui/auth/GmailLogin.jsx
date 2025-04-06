import React, { useState } from 'react';
import LoginForm from '../../auth/LoginForm';
import RegisterForm from '../../auth/RegisterForm';

const GmailLogin = ({ isLogin, setIsLogin }) => {
    const [authError, setAuthError] = useState('');

    const handleLoginChange = () => {
        setIsLogin(prev => !prev);

    }

    return (
        <>
            {authError && (
                <div className="mb-4 p-3 rounded-md bg-red-50 text-[var(--color-error)] text-sm">
                    {authError}
                </div>
            )}
            {isLogin
                ? <LoginForm setAuthError={setAuthError} handleLoginChange={handleLoginChange} />
                : <RegisterForm setAuthError={setAuthError} handleLoginChange={handleLoginChange} />}
        </>
    );
};

export default GmailLogin;
