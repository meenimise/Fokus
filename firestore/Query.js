//Based on: https://github.com/AlterClassIO/react-firechat/blob/master/src/hooks.js

import { useEffect, useState, useRef } from 'react';
//Firestore
import { db } from '../firebase/firebase.config';
import * as fs from 'firebase/firestore';

export function useFirestoreQuery(query) {
  const [docs, setDocs] = useState([]);

  // Store current query in ref
  const queryRef = useRef(query);

  // Compare current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method
    // to compare queries
    if (!fs.queryEqual(queryRef?.current, query)) {
      queryRef.current = query;
    }
  });


  // Re-run data listener only if query has changed (important!)
  useEffect(() => {
    if (!queryRef?.current) {
      return null;
    }

    // Subscribe to query with onSnapshot
    const unsubscribe = fs.onSnapshot(queryRef.current, (querySnapshot) => {
        // Get all documents from collection - with IDs
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        // Update state
        setDocs(data);
      });

    // Detach listener
    return unsubscribe;
  }, [queryRef]);

  return docs;
}