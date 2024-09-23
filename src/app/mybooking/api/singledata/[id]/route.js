import { mongodb } from "@/lib/mongodb"
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
    try {
        const db = await mongodb();
        const bookingsCollection = db.collection("bookings");
        const bookings = await bookingsCollection.findOne({ _id: new ObjectId(params.id) })
        return Response.json({ bookings, message: 'bookings data get' })

    } catch (error) {
        return Response.json({ error: 'bookings data fetch fail' })
    }
}
