import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { PrimitiveAtom } from "jotai";
import { atomEffect } from "jotai-effect";

import { authStateAtom } from "../authentication";

export function firestoreSubscribeAtom<Value extends Record<string, unknown>>(
  targetAtom: PrimitiveAtom<Value>,
  query: Query,
  transform: (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => Value
) {
  return atomEffect((get, set) => {
    const auth = get(authStateAtom);
    if (!auth.isAuthenticated) {
      set(targetAtom, {} as Value);
    } else {
      const cleanup = onSnapshot(query, (snapshot) => {
        const changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (["added", "modified"].includes(change.type)) {
            const data = change.doc.data();
            set(targetAtom, (prev) => ({
              ...prev,
              ...transform(change.doc),
            }));
          }
          if (change.type === "removed") {
            set(targetAtom, (prev) => {
              const { [change.doc.id]: _, ...newData } = prev;
              return newData as Value;
            });
          }
        });
      });
      return cleanup;
    }
  });
}
