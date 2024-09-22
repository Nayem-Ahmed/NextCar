import { mongodb } from "@/lib/mongodb"

export const GET = async (req, { params }) => {
    try {
        const db = await mongodb();
        const bookingsCollection = db.collection("bookings");
        const bookings = await bookingsCollection.find({ email: params.email }).toArray();
        return Response.json({ bookings, message: 'bookings data get' })

    } catch (error) {
        return Response.json({ error: 'bookings data fetch fail' })
    }
}
