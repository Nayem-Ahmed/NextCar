import { mongodb } from "@/lib/mongodb"
import { ObjectId } from "mongodb";

export const PATCH = async (req, { params }) => {
    try {
        // Parse the request body to get the data you want to update
        const updateDoc = await req.json();

        const db = await mongodb();
        const bookingsCollection = db.collection("bookings");
        const result = await bookingsCollection.updateOne(
            { _id: new ObjectId(params.id) },
            { $set: { ...updateDoc } },
            { upsert: true }
        );
        return Response.json({ message: 'Booking update successfully', result })


    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Failed to update booking' })

    }

}