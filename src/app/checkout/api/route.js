import { mongodb } from "@/lib/mongodb";

export const POST = async (req) => {
    try {
        const newBooking = await req.json(); // Get the booking data from the request body
        const db = await mongodb();          // Connect to the MongoDB database
        const bookingsCollection = db.collection('bookings');

        const result = await bookingsCollection.insertOne(newBooking); // Insert the new booking

        return Response.json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error(error);

        return Response.json({ error: 'Error creating booking' });
    }
};
