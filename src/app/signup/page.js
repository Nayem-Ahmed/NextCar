"use client";
import Image from 'next/image';
import Link from 'next/link';

const SignupPage = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your signup logic here

        const newUser = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,

        }
        const res = await fetch('http://localhost:3000/signup/api', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newUser)
        })
        if (res.ok) {
            event.target.reset(); // Clear the form after successful submission
        } else {
            console.error('Signup failed');
        }

    };
    return (
        <div className='flex flex-col md:flex-row justify-center my-8 p-10'>
            <div className='md:w-1/2'>
                <Image
                    src="assets/images/login/login.svg"
                    width={400}
                    height={40}
                    alt="Signup illustration"
                />
            </div>
            <div className='md:w-1/2 border'>
                <form onSubmit={handleSubmit} className="flex flex-col p-5">
                    <label className="mb-2 text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        required
                        className="mb-4 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your username"
                    />
                    <label className="mb-2 text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="mb-4 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                    />
                    <label className="mb-2 text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="mb-6 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your password"
                    />
                    <button
                        type="submit"
                        className="btn btn-error"
                    >
                        Sign Up
                    </button>
                    <i className='text-center my-2'>or</i>
                    <button className="btn no-animation">Sign Up with Google</button>
                    <p>Already have an account? <Link href={`/login`} className='text-red-500'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
