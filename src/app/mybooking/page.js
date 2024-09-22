"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
    const session = useSession();
    const [bookings, setBookings] = useState([]);
    console.log(bookings);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetch(`http://localhost:3000/mybooking/api/${session?.data?.user?.email}`)
                let posts = await data.json();
                setBookings(posts?.bookings)


            } catch (error) {
                console.log(error);

            }

        }
        fetchData();
    }, [session])

    const handleDelete = async (id) => {
        try {
            let response = await fetch(`http://localhost:3000/mybooking/api/booking-delete/${id}`, {
                method: "DELETE"
            })
            let data = await response.json();
            console.log(data);

            if (data?.result?.deletedCount > 0) {
                console.log('Booking deleted:', data.message);
                // Update the bookings state to remove the deleted booking
                setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
            } else {
                console.log('Error deleting booking:', data.error);
            }



        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div className="container mx-auto">

            <div className="relative  h-72">
                <Image
                    className="absolute h-72 w-full left-0 top-0 object-cover"
                    src={"/assets/images/about_us/parts.jpg"}
                    alt="service"
                    width={1920}
                    height={1080}
                    style={{ width: "90vw" }}
                />
                <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
                    <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
                        My Bookings
                    </h1>
                </div>
            </div>
            <div className="mt-12">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Service Name</th>
                                <th>Price</th>
                                <th>Booking Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {bookings?.map(({ title, _id, date, price }, index) => (
                                <tr key={_id}>
                                    <th>{index + 1}</th>
                                    <td>{title}</td>
                                    <td>{price}</td>
                                    <td>{date}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <Link href={`/mybookings/update/${_id}`}><button class="btn btn-sm">Edit</button></Link>
                                            <button
                                                onClick={() => handleDelete(_id)}
                                                class="btn btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default page;