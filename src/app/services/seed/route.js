import { mongodb } from "@/lib/mongodb"
import { services } from "@/lib/services";

export const GET = async () => {
    const db = await mongodb();
    const servicesCollection = db.collection("services");
    try {
        // Clear existing services data
        await servicesCollection.deleteMany();
        const res = await servicesCollection.insertMany(services);
        return Response.json({ message: "Services inserted successfully" });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Failed to insert services" });



    }


}