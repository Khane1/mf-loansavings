import {
    setDoc, doc, getFirestore, collection,
    getDocs, query, where, updateDoc, arrayUnion, getDoc, onSnapshot, limit
} from 'Firebase/firestore';
import { fb_db } from '../firebase_init';

const businessDoc = (businessId) => doc(fb_db, 'business', businessId)

export async function getBusiness(id) {
    let business = (await getDoc(businessDoc(id))).data();
    return business
}