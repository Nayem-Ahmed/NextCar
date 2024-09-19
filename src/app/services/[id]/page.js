import { getServicesDetails } from '@/services/getServices';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = async ({ params }) => {
    const serviceDetails = await getServicesDetails(params.id);

    return (
        <div className="container mx-auto my-10">
            <div>
                <div className="relative  h-72">
                    <Image
                        className="absolute h-72 w-full left-0 top-0 object-cover"
                        src={serviceDetails?.img}
                        alt={serviceDetails?.title}
                        width={1920}
                        height={1080}
                        style={{ width: "90vw" }}
                        unoptimized={true}  // Bypasses image optimization
                    />
                    <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
                        <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
                            Details of {serviceDetails?.title}
                        </h1>
                    </div>
                </div>

                <div className="p-10 bg-gray-100">
                    <h2 className="text-3xl font-bold text-orange-600">{serviceDetails?.title}</h2>
                    <p>{serviceDetails?.description}</p>
                </div>
            </div>

            <div className="my-6">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 grid grid-cols-2 gap-6">
                        {serviceDetails?.facility?.map((item, index) => (
                            <div
                                className="bg-rose-100 p-4 border-t-4 border-t-rose-500 rounded-xl"
                                key={index}
                            >
                                <h2 className="text-xl font-bold">{item?.name}</h2>
                                <p>{item?.details}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-gray-100">
                        <Image className="w-full object-cover h-40" src={'/assets/images/checkout/checkout.png'} alt="checkout service" width={400} height={400} />
                        <div className="flex my-4">
                            <h2 className="text-xl font-bold ">Price: </h2>
                            <p className="text-2xl text-rose-500"> ${serviceDetails?.price}</p>
                        </div>
                        <Link href={`/checkout/${serviceDetails?._id}`}>
                            <button className="bg-rose-500 px-3 py-2 rounded-lg mt-2 w-full">Check out</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;