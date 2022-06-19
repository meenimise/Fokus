import type { runTransaction, collection, query, getDocs, where, limit, doc, getDoc, addDoc, updateDoc, deleteDoc, Firestore, FirestoreDataConverter } from "firebase/firestore";
import type { Adapter } from "next-auth/adapters";
export declare const collections: {
    readonly Users: "users";
    readonly Sessions: "sessions";
    readonly Accounts: "accounts";
    readonly VerificationTokens: "verificationTokens";
};
export declare const format: FirestoreDataConverter<any>;
export interface FirebaseClient {
    db: Firestore;
    collection: typeof collection;
    query: typeof query;
    getDocs: typeof getDocs;
    where: typeof where;
    limit: typeof limit;
    doc: typeof doc;
    getDoc: typeof getDoc;
    addDoc: typeof addDoc;
    updateDoc: typeof updateDoc;
    deleteDoc: typeof deleteDoc;
    runTransaction: typeof runTransaction;
}
export declare function FirebaseAdapter(client: FirebaseClient): Adapter;
