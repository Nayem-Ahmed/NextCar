import { mongodb } from "@/lib/mongodb"

export const GET = async (request, { params }) => {
    try {
        const db = await mongodb();
        const servicesCollection = db.collection("services");
        const service = await servicesCollection.findOne({ _id: params.id });
        return Response.json(service);


    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Failed to fetch service' });


    }
}