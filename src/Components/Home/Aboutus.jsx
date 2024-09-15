import Image from 'next/image';
import React from 'react';

const Aboutus = () => {
    return (
        <div className='flex gap-5'>
            <div className='relative w-1/2'>

                <Image
                    src="/assets/images/about_us/person.jpg"
                    width={400}
                    height={60}
                    alt="Picture of the author"
                />
                <div className='absolute left-40 top-36 border-t-4 border-l-4 border-white'>
                    <Image
                        src="/assets/images/about_us/parts.jpg"
                        width={300}
                        height={60}
                        alt="Picture of the author"
                    />

                </div>
            </div>

            <div className='w-1/2'>
                <span className='text-[#FF3811]'>About Us</span>
                <h1 className='text-3xl font-bold mb-3'>We are qualified <br></br> & of experience <br></br> in this field</h1>
                <p className='text-gray-500 mb-3'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <button className='bg-red-500 px-5 py-2 rounded-md text-white' type="button">Get More Info</button>
            </div>

        </div>
    );
};

export default Aboutus;