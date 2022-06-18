import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { db } from '../../../firebase/firebaseConfig';
import * as firestoreFunctions from 'firebase/firestore';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }            
        })
    ],
    adapter: FirebaseAdapter({
        db: db,
        ...firestoreFunctions,
    }),
    secret: process.env.SECRET,

    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token, user }) {
            session = {
                ...session,
                user: {
                    id: user.id,
                    ...session.user
                }
            }
            return session
        }
    }
});
