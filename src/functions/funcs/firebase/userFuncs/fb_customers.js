import {
    setDoc, doc, deleteDoc, updateDoc, limit, query, collection
} from 'firebase/firestore';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
import { fb_db } from '../firebase_init';
import { uuidv4 } from '@firebase/util';
import { customersStore, loadingStateStore } from '../../stores';
import { customDocumentTablelistenerTemplate, tablelistenerTemplate } from './fb_universal';
import { uploadItemImage } from './fb_imageUpload';
import { updateBusinessClients } from './fb_business';

const customerDoc = (businessId, customerId) => doc(fb_db, 'business', businessId, 'customers', customerId)
const customerCol = (businessId,) => collection(fb_db, 'business', businessId, 'customers')


let errorMessage = () => cliq_notify('d', 'Error Occured Try again');

export async function createCustomer(bid, rawfile, gua_RawFile, data, business) {
    let userUrl = await uploadItemImage(rawfile)
    let gua_Url = await uploadItemImage(gua_RawFile)
    data['userUrl'] = userUrl;
    data['gua_Url'] = gua_Url;
    let customerId = uuidv4()
    data['customerId'] = customerId
    try {
        await setDoc(customerDoc(bid, customerId),
            data
        ).then(async (e) => {
            await updateBusinessClients(bid, business)
            cliq_notify('s', 'customer created')
            console.log(e);
        })
    } catch (error) {
        errorMessage();
        console.log(error);
    }

}
export async function updatecustomerImage(bid, rawfile, gua_RawFile, data) {
    let doc = customerDoc(bid, data.customerId)
    try {
        if (rawfile.avatar != undefined && rawfile.avatar.length > 0) {
            let userUrl = await uploadItemImage(rawfile)
            await updateDoc(doc, {
                userUrl
            }).then((e) => cliq_notify('s', 'Update Complete'))
        } else if (gua_RawFile != undefined && gua_RawFile.avatar.length > 0) {
            let gua_Url = await uploadItemImage(gua_RawFile)
            await updateDoc(doc, {
                gua_Url
            }).then((e) => cliq_notify('s', 'Update Complete'))
        }
    } catch (error) {
        errorMessage();
    }
}
export async function deleteCustomer(bid, customerId) {
    try {

        await deleteDoc(customerDoc(bid, customerId))
        cliq_notify('s', 'customer deleted')
    } catch (error) {
        errorMessage();
        console.log(error);
    }
}

export async function customerTablelistener(business_id) {
    // loadingStateStore.update((e) => { return { state: 'loading' } })
    // let route = 'business/' + business_id + '/customers'
    // await tablelistenerTemplate(route, business_id, customersStore)
    // loadingStateStore.update((e) => { return { state: 'loading' } })

    const conditions = [limit(10)]
    await customDocumentTablelistenerTemplate(query(customerCol(business_id), ...conditions), business_id, customersStore)
}


