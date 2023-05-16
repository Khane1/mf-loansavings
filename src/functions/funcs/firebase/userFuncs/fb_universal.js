import {
    collection,
    getDocs, query, onSnapshot
} from 'firebase/firestore';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
import { fb_db } from '../firebase_init';


function listprocessor(fb, store, business_id) {
    let list = [];
    if (fb.docs.length != 0) {
        fb.docs.forEach((val) => {
            if (list.filter(e => e.customerId === val.id).length == 0) {
                list = [...list, { data: val.data(), customer_id: val.id }]
            } else {

            }
        })
        store.update((e) => {
            return { value: list, businessId: business_id };
        });
    } else cliq_notify('w', 'No results found')
}

export async function tablelistenerTemplate(cltn, business_id, store) {
    console.log(cltn);
    try {
        onSnapshot(query(collection(fb_db, cltn)), async (fb) => {
            listprocessor(fb, store, business_id)
        })
    } catch (error) {
        console.log(error.message);
    }
}

export async function customQuerytablelistenerTemplate(customQuery, business_id, store) {
    try {
        onSnapshot(customQuery, async (fb) => {
            listprocessor(fb, store, business_id)
        })
    } catch (error) {
        console.log(error.message);
    }
}
export async function customDocumentTablelistenerTemplate(customQuery, business_id, storage) {

    try {
        await getDocs(customQuery).then((fb) => {
            listprocessor(fb, storage, business_id)
        }).catch((e) => {
            console.log(e);

        })
    } catch (error) {
        console.log(error.message);
    }
}