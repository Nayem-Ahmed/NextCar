"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const loginpage = () => {
    const handlesubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

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
                        type="email"
                        name="email"
                        className="mb-4 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                    />
                    <label className="mb-2 text-gray-700">Password</label>
                    <input
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
                    <button className="btn no-animation">Google</button>
                    <p>Have an account? <Link href={`/signup`} className='text-red-500'>Sign Up</Link></p>
                </form>

            </div>

        </div>
    );
};

export default loginpage;