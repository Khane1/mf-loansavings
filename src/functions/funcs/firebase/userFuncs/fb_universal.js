import {
    collection,
    getDocs, query, onSnapshot
} from 'Firebase/firestore';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
import { fb_db } from '../firebase_init';


export async function tablelistenerTemplate(cltn, business_id, store) {
    console.log(cltn);
    try {
        onSnapshot(query(collection(fb_db, cltn)), async (fb) => {
            let list = [];
            if (fb.docs.length != 0) {
                fb.docs.forEach((val) => {
                    console.log(list.filter(e => e.customerId !== val.id).length == 0);
                    if (list.filter(e => e.customerId === val.id).length == 0) {
                        list = [...list, { data: val.data(), customer_id: val.id }]
                        // console.log(list);
                    } else {

                    }
                })
                store.update((e) => {
                    return { value: list, businessId: business_id };
                });
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

export async function customQuerytablelistenerTemplate(customQuery, business_id, store) {
    try {
        onSnapshot(customQuery, async (fb) => {
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
        })
    } catch (error) {
        console.log(error.message);
    }
}
export async function customDocumentTablelistenerTemplate(customQuery, business_id, storage) {

    try {
        await getDocs(customQuery).then((fb) => {
            let list = [];
            if (fb.docs.length != 0) {
                fb.docs.forEach((val) => {
                    if (list.filter(e => e.customerId === val.id).length == 0) {
                        list = [...list, { data: val.data(), customer_id: val.id }]
                    } else {

                    }
                })
                storage.update((e) => {
                    return { value: list, businessId: business_id };
                });
            }
        }).catch((e) => {
            console.log(e);

        })
    } catch (error) {
        console.log(error.message);
    }
}