import Link from 'next/link';
import React from 'react';

const Banner = () => {
    return (
        <div className="carousel w-full">
            {
                banner.map((b, index) => (
                    <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full">
                        <img
                            src={`/assets/images/banner/${index + 1}.jpg`}
                            alt={b.title}
                            className="w-full object-cover h-[100vh] object-top"
                        />
                        <div className="absolute right-10 bottom-14 flex gap-5 z-50">
                            <a href={b.prev} className="btn btn-circle">❮</a>
                            <a href={b.next} className="btn btn-circle">❯</a>
                        </div>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Semi-transparent overlay */}
                        {/* Text Content */}
                        <div className="absolute max-w-xl mb-4 top-1/2 left-5 transform -translate-y-1/2 text-white z-10">
                            <h1 className="text-4xl font-bold mb-2">{b.title}</h1>
                            <h2 className="text-md">{b.subtitle}</h2>
                            <div className='flex gap-5 mt-4'>
                                <button className='bg-red-500 px-5 py-2 rounded-md text-white' type="button">Discover More</button>
                                <Link href={`/login`}>
                                    <button className='bg-red-500 px-5 py-2 rounded-md text-white' type="button">login</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Banner;

const banner = [
    {
        title: 'Affordable Price For Car Servicing',
        subtitle: "There are many variations of passages available, but the majority have suffered alteration in some form",
        image: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        prev: '#slide4',
        next: '#slide2',
    },
    {
        title: 'Quality Parts & Accessories',
        subtitle: "Find the best quality parts and accessories to keep your car running smoothly",
        image: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        prev: '#slide1',
        next: '#slide3',
    },
    {
        title: 'Expert Technicians',
        subtitle: "Our technicians are certified and have years of experience in car servicing",
        image: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        prev: '#slide2',
        next: '#slide4',
    },
    {
        title: 'Customer Satisfaction',
        subtitle: "We prioritize customer satisfaction with top-notch service and support",
        image: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        prev: '#slide3',
        next: '#slide1',
    },
];