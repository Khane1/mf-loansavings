import {
    setDoc, doc, deleteDoc
} from 'firebase/firestore';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
import { fb_db } from '../firebase_init';
import { uuidv4 } from '@firebase/util';
import { customersStore, loadingStateStore } from '../../stores';
import { tablelistenerTemplate } from './fb_universal';
import { uploadItemImage } from './fb_imageUpload';

const customerDoc = (businessId, customerId) => doc(fb_db, 'business', businessId, 'customers', customerId)

export async function createCustomer(bid, rawfile, gua_RawFile, data) {
    let userUrl = await uploadItemImage(rawfile)
    let gua_Url = await uploadItemImage(gua_RawFile)
    data['userUrl'] = userUrl;
    data['gua_Url'] = gua_Url;
    let customerId = uuidv4()
    data['customerId'] = customerId
    try {
        await setDoc(customerDoc(bid, customerId),
            data
        ).then((e) => {
            cliq_notify('s', 'customer created')
            console.log(e);
        })
    } catch (error) {
        cliq_notify('d', 'Error Occured Try again')
        console.log(error);
    }

}
export async function deleteCustomer(bid, customerId) {
    try {

        await deleteDoc(customerDoc(bid, customerId))
        cliq_notify('s', 'customer deleted')
    } catch (error) {
        cliq_notify('d', 'Error Occured Try again')
        console.log(error);
    }
}

export async function customerTablelistener(business_id) {
    loadingStateStore.update((e) => { return { state: 'loading' } })
    let route = 'business/' + business_id + '/customers'
    await tablelistenerTemplate(route, business_id, customersStore)
    loadingStateStore.update((e) => { return { state: 'loading' } })

}


