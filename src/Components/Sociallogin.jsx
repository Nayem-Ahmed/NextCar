"use client"
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const Sociallogin = () => {
    const router = useRouter();
    const sessiion = useSession()
    const searchParams = useSearchParams();
    const path = searchParams.get("redirect");

    const handlelogin = async (provider) => {
        const res = await signIn(provider,{
                redirect: true,
                callbackUrl: path ? path : "/",
            });
      

    };
    // if (sessiion.status === "authenticated") {
    //     router.push("/")
    // } else {
    //     console.error('Login failed');
    // }

    return (
        <div>
            <button onClick={() => handlelogin('google')} className="btn no-animation mx-auto block w-full">
                Sign Up with Google
            </button>
        </div>
    );
};

export default Sociallogin;
