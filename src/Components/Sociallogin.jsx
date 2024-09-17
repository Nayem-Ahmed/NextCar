import React from 'react';
import { signIn } from 'next-auth/react';

const Sociallogin = () => {
    const handlelogin = async (provider) => {
        await signIn(provider);
    };

    return (
        <div>
            <button onClick={() => handlelogin('google')} className="btn no-animation">
                Sign Up with Google
            </button>
        </div>
    );
};

export default Sociallogin;
