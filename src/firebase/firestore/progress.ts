import { collection, query } from "firebase/firestore";
import { atom } from "jotai";

import { db } from "./firestore";
import { firestoreSubscribeAtom } from "./utils";

const progressCollectionRef = collection(db, "progress");
