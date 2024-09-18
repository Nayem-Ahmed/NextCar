import React from 'react';
import Link from 'next/link';


const getServices = async () => {
    let data = await fetch('http://localhost:3000/services/api/get-all')
    let services = await data.json()
    return services;

}

const Services = async () => {
    const services = await getServices();

    return (
        <div className='my-28 container mx-auto'>
            <div className='text-center mx-auto'>
                <span className='text-[#FF3811] mb-3'>Service</span>
                <h1 className='font-bold text-3xl'>Our Service Area</h1>
            </div>
            <div className='grid gap-5 grid-cols-3 mt-8'>

                {
                    services?.map((service) => (
                        <div key={service._id} className="card card-compact bg-base-100   shadow-xl">
                            <figure>
                                <img
                                    className='w-full h-48 object-cover'
                                    src={service.img}
                                    alt=" " />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{service.title}</h2>
                                <p>$ {service.price}</p>

                                <Link href={`/details/${service._id}`} className="card-actions justify-end">
                                    <button className="btn btn-error">Details</button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;