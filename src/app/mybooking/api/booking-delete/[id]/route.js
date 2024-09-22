import { mongodb } from "@/lib/mongodb"
import { ObjectId } from "mongodb";

export const DELETE = async (req, { params }) => {
    try {
        const db = await mongodb();
        const bookingsCollection = db.collection("bookings");
        const result = await bookingsCollection.deleteOne({ _id: new ObjectId(params.id) });
        return Response.json({ message: 'Booking deleted successfully',result })


    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Failed to delete booking' })

    }

}