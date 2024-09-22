import { mongodb } from "@/lib/mongodb";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcrypt";

const handler = NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,
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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            const db = await mongodb();

            // Only handle Google logins
            if (account.provider === 'google') {
                const existingUser = await db.collection("users").findOne({ email: user.email });

                // If user does not exist, create a new user
                if (!existingUser) {
                    const newUser = {
                        username: user.name, // user contains the Google profile information
                        email: user.email,
                        image: user.image,
                    };
                    await db.collection("users").insertOne(newUser);
                }
            }

            return true; // Allow the sign-in to proceed
        },
        // async session({ session, token }) {
        //     session.user.id = token.id;
        //     return session;
        // },
        // async jwt({ token, user }) {
        //     if (user) {
        //         token.id = user._id;
        //     }
        //     return token;
        // }
    },
    pages: {
        signIn: '/login'
    }
})

export { handler as GET, handler as POST }