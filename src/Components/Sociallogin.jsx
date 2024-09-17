import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Sociallogin = () => {
    const router = useRouter();
    const sessiion = useSession()

    const handlelogin = async (provider) => {
        const res = await signIn(provider , { redirect: false });
        console.log(res);
        
    };
    if (sessiion.status === "authenticated") {
        router.push("/")
    } else {
        console.error('Login failed');
    }

    return (
        <div>
            <button onClick={() => handlelogin('google')} className="btn no-animation mx-auto block w-full">
                Sign Up with Google
            </button>
        </div>
    );
};

export default Sociallogin;
