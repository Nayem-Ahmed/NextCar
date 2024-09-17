import { mongodb } from "@/lib/mongodb";
import bcrypt from "bcrypt";

export const POST = async (request) => {
    try {
        // Parse the incoming request body
        const newUser = await request.json();

        // Connect to the MongoDB database
        const db = await mongodb();
        const userCollection = db.collection('users');

        // Check if a user with the same email already exists
        const existingUser = await userCollection.findOne({ email: newUser.email });

        if (existingUser) {
            // If user exists, return a conflict response
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
        }
        const hash = bcrypt.hashSync(newUser.password, 14);

        // Insert the new user into the "users" collection
        const result = await userCollection.insertOne({...newUser, password: hash});

        // Return a JSON response indicating success
        return new Response(JSON.stringify({ message: 'User added', userId: result.insertedId }), { status: 201 });
    } catch (error) {
        console.error('Error adding user:', error);

        // Return an error response
        return new Response(JSON.stringify({ error: 'Failed to add user' }), { status: 500 });

    }
};
