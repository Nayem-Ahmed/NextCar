"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sociallogin from '@/Components/Sociallogin';

const loginpage = () => {
    const router = useRouter()
    const handlesubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false
        });
         if (res.ok) {
            router.push("/")
            e.target.reset(); // Clear the form after successful submission
        } else {
            console.error('Login failed');
        }


    }
    return (
        <div className='flex flex-col md:flex-row justify-center my-8 p-10'>
            <div className='md:w-1/2'>
                <Image
                    src="assets/images/login/login.svg"
                    width={400}
                    height={40}
                    alt="Picture of the author"
                />
            </div>
            <div className='md:w-1/2 border'>
                <form onSubmit={handlesubmit} className="flex flex-col p-5">
                    <label className="mb-2 text-gray-700">Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        className="mb-4 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                    />
                    <label className="mb-2 text-gray-700">Password</label>
                    <input
                        required
                        type="password"
                        name="password"
                        className="mb-6 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your password"
                    />
                    <button
                        type="submit"
                        className="btn btn-error"
                    >
                        Login
                    </button>
                    <i className='text-center'>or</i>
                    <Sociallogin></Sociallogin>
                    <p>Have an account? <Link href={`/signup`} className='text-red-500'>Sign Up</Link></p>
                </form>

            </div>

        </div>
    );
};

export default loginpage;