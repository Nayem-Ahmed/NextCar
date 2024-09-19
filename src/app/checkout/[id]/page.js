"use client";
import { getServicesDetails } from '@/services/getServices';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const page = ({ params }) => {
    const { data } = useSession();

    const [service, setService] = useState(null);  // To store service data
    const [loading, setLoading] = useState(true);  // To manage loading state
    const [error, setError] = useState(null);     // To handle errors

    useEffect(() => {
        // Fetch service details when the component is mounted
        const fetchData = async () => {
            try {
                const serviceData = await getServicesDetails(params.id);
                setService(serviceData);  // Update state with the fetched data
            } catch (err) {
                setError("Failed to fetch service details.");
            } finally {
                setLoading(false);   // Set loading to false after the data is fetched
            }
        };

        fetchData();  // Call fetchData on component mount
    }, [params.id]);

    // Render loading state
    if (loading) {
        return <div className='text-center'>Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div>{error}</div>;
    }



    const handleBooking = async (event) => {
        event.preventDefault();

        // Destructure service object to exclude _id
        const { _id, ...serviceWithoutId } = service;
        const bookingData = {
            name: data?.user?.name,
            email: data?.user?.email,
            date: event.target.date.value,
            phone: event.target.phone.value,
            address: event.target.address.value,
            ...serviceWithoutId

        }
        try {
            const response = await fetch('http://localhost:3000/checkout/api', {
                method: 'POST',
                body: JSON.stringify(bookingData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
            
        }



    }

    return (
        <div className="container mx-auto">
            <div className="relative  h-72">
                <Image
                    className="absolute h-72 w-full left-0 top-0 object-cover"
                    src={service?.img}
                    alt="service"
                    width={1920}
                    height={1080}
                    style={{ width: "90vw" }}
                    unoptimized={true}  // Bypasses image optimization
                />
                <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
                    <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
                        Checkout {service?.title}
                    </h1>
                </div>
            </div>
            <div className="my-12 bg-slate-300 p-12">
                <form onSubmit={handleBooking}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input defaultValue={data?.user?.name} type="text" name="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input defaultValue={new Date().getDate()} type="date" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                defaultValue={data?.user?.email}
                                type="text"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due amount</span>
                            </label>
                            <input
                                defaultValue={service?.price}
                                readOnly
                                type="text"
                                name="price"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                required
                                type="text"
                                name="phone"
                                placeholder="Your Phone"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Present Address</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Your Address"
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input
                            className="btn btn-error btn-block"
                            type="submit"
                            value="Order Confirm"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;