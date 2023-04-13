import {
    setDoc, doc, getFirestore, collection,
    getDocs, query, where, updateDoc, arrayUnion, getDoc, onSnapshot, limit
} from 'Firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { fb_db } from '../firebase_init';
import { tablelistenerTemplate } from './fb_universal';
import { loanStore } from '../../stores';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
const loanDoc = (businessId, loanId) => doc(fb_db, 'business', businessId, 'loans', loanId)
const customerDoc = (businessId, customerId) => doc(fb_db, 'business', businessId, 'customers', customerId)


export async function createLoan(bid, customerId, data) {
    try {

        let loanId = uuidv4()
        console.log(bid, loanId, data);
        data['loanId'] = loanId;
        try {
            await setDoc(loanDoc(bid, loanId), data)
            await updateDoc(customerDoc(bid, customerId), {
                status: 'active'
            })
            cliq_notify('s','Loan created')
            
        } catch (error) {
            cliq_notify('d','Error Occured Try again')
            console.log(error);
        }
    } catch (error) {
        alert('An error occured please try again')
    }

}

export async function getLoans(bid,) {
    let cltn = 'business/' + bid + '/loans'
   await tablelistenerTemplate(cltn, bid, loanStore)
}