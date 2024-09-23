"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const UpdateBookingPage = ({ params }) => {
    const session = useSession();
    const [booking, setBooking] = useState([]);

    // Fetch the existing booking data when the page loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetch(`http://localhost:3000/mybooking/api/singledata/${params.id}`)
                let posts = await data.json();
                console.log(posts?.bookings);
                setBooking(posts?.bookings)

            } catch (error) {
                console.log(error);

            }

        }
        fetchData();
    }, [session?.data?.user?.email, params.id])

    // Update booking form submission handler
    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedBooking = {
            date: event.target.date.value,
            phone: event.target.phone.value,
            address: event.target.address.value,
        };

        try {
            const response = await fetch(`http://localhost:3000/mybooking/api/update-booking/${params.id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedBooking),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                toast.success("Booking updated successfully!");

            } else {
                toast.error("Failed to update booking.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the booking.");
        }
    };




    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Update Booking</h1>
            <div className="bg-slate-300 p-8">
                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                readOnly
                                defaultValue={session?.data?.user?.name}
                                required
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                readOnly
                                defaultValue={session?.data?.user?.email}
                                required
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                defaultValue={booking?.date}
                                required
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="text"
                                name="price"
                                defaultValue={booking.price}
                                readOnly
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                defaultValue={booking?.phone}
                                required
                                placeholder="Phone Number"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                defaultValue={booking?.address}
                                placeholder="Address"
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary btn-block" type="submit">
                            Update Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBookingPage;
