import React, { useState } from 'react';
import LoginForm from '../../auth/LoginForm';
import RegisterForm from '../../auth/RegisterForm';

const GmailLogin = ({ isLogin }) => {
    const [authError, setAuthError] = useState('');

    return (
        <>
            {authError && (
                <div className="mb-4 p-3 rounded-md bg-red-50 text-[var(--color-error)] text-sm">
                    {authError}
                </div>
            )}
            {isLogin
                ? <LoginForm setAuthError={setAuthError} />
                : <RegisterForm setAuthError={setAuthError} />}
        </>
    );
};

export default GmailLogin;
