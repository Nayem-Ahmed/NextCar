import { mongodb } from "@/lib/mongodb";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                if (!email || !password) {
                    return null;

                }
                const db = await mongodb();
                const currentuser = await db.collection("users").findOne({ email });
                if (!currentuser) {
                    return null

                }
                const mathedpassword = bcrypt.compareSync(password, currentuser.password);
                if (!mathedpassword) {
                    return null
                    
                }
                return currentuser;
            },

        }),
    ],
    callbacks: {},
    pages: {
        signIn: '/login'
    }
})

export { handler as GET, handler as POST }