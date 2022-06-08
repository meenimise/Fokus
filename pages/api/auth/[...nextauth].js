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
    /*
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
              token.accessToken = account.access_token;
            }
            return token;
        },        
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            return session;
        },               
    }
    */ 
});