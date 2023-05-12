import {
    collection,
    doc, getDoc, onSnapshot, query, updateDoc, where,
} from 'firebase/firestore';
import { fb_db } from '../firebase_init';
import { businessStore, capitalStore } from '../../stores';
import { tablelistenerTemplate, customDocumentTablelistenerTemplate } from './fb_universal';

const businessDoc = (businessId) => doc(fb_db, 'business', businessId)
const businessCol = () => collection(fb_db, 'business')
export async function getBusiness(id) {
    let business = (await getDoc(businessDoc(id))).data();
    businessStore.update((e) => { return business; })
}

export async function businessCapitallistener(business_id) {
    console.log(business_id);
    const conditions = [where('BusinessId', '==', business_id)]
    onSnapshot(query(businessCol(), ...conditions), async (val) => {
        let business = (val.docs[0].data());
        businessStore.update((e) => { return business })
    })
}

export async function updateCapital(id, cap) {
    try {
        await updateDoc(businessDoc(id), { capital: cap })
        await getBusiness(id)
    } catch (error) {
        console.log(error);
    }
}
export async function updateBusinessClients(id, business) {
    try {
        await updateDoc(businessDoc(id), { clients: business.clients + 1 })
    } catch (error) {
        console.log(error);
    }
}