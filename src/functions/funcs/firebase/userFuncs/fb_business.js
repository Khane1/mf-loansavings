import {
    doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { fb_db } from '../firebase_init';
import { businessStore } from '../../stores';
import { tablelistenerTemplate } from './fb_universal';

const businessDoc = (businessId) => doc(fb_db, 'business', businessId)

export async function getBusiness(id) {
    let business = (await getDoc(businessDoc(id))).data();
    businessStore.update((e) => { return business; })
}

export async function updateCapital(id, cap) {
    try {
        await updateDoc(businessDoc(id), { capital: cap })
        await getBusiness(id)
    } catch (error) {
        console.log(error);
    }
}