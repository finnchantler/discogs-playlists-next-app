'use client';

import React from 'react';

const Login = () => {
    const handleLogin = () => {
    window.location.href = '/api/auth/authorise';
};

    return (
        <div>
            <button onClick={handleLogin}>Login with Discogs</button>
        </div>
    );
};

export default Login;
