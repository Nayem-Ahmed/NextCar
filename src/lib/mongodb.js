import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;

let db; // Cached database connection
export const mongodb = async () => {
    if (db) return db; // Return the cached connection if it exists
    try {
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        await client.connect(); // Ensure the client is connected
        db = client.db("car-doctor"); // Access the "car-doctor" database
        return db;

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);

    }

}