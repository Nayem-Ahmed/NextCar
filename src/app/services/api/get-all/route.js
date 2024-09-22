import { mongodb } from "@/lib/mongodb"

export const GET = async () => {
    try {

        const db = await mongodb();
        const services = await db.collection("services").find().toArray(); // Await the query
        return Response.json({services});
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Failed to fetch services' });


    }

}