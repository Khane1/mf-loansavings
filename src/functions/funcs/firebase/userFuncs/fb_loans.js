import {
    setDoc, doc, updateDoc, where, query, collection, or
} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { fb_db } from '../firebase_init';
import { customDocumentTablelistenerTemplate, customQuerytablelistenerTemplate, tablelistenerTemplate } from './fb_universal';
import { loanStore } from '../../stores';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
const loanDoc = (businessId, loanId) => doc(fb_db, 'business', businessId, 'loans', loanId)
const loanCol = (businessId,) => collection(fb_db, 'business', businessId, 'loans')

const customerDoc = (businessId, customerId) => doc(fb_db, 'business', businessId, 'customers', customerId)
import { updateCapital } from './fb_business'
import { dateTransfer, getDateToday } from '../../../func_essential';

export async function createLoan(business, customerId, data) {
    try {
        let loanId = uuidv4()
        let capital = (business.capital + data['Opening_Fee']) - data['Loan'];
        console.log(business.BusinessId, loanId, data);
        data['loanId'] = loanId;
        try {
            await setDoc(loanDoc(business.BusinessId, loanId), data)
            await updateCapital(business.BusinessId, capital)
            await updateDoc(customerDoc(business.BusinessId, customerId), {
                status: data['status']
            })
            cliq_notify('s', 'Loan created')

        } catch (error) {
            cliq_notify('d', 'Error Occured Try again')
            console.log(error);
        }
    } catch (error) {
        alert('An error occured please try again')
    }

}

// export async function getLoans(bid,) {
//     let cltn = 'business/' + bid + '/loans'
//     await tablelistenerTemplate(cltn, bid, loanStore)
// }

export async function getLoans(bid) {
    const conditions=[where('status','==','active')]
    // const conditions = [where('date', '>=', new Date(String(new Date().getMonth()+1).padStart(2, "0") + '-1-' + String(new Date().getFullYear()).padStart(2, "0"))), where('date', '<=', new Date(String(new Date().getMonth()+1).padStart(2, "0") + '-30-' + String(new Date().getFullYear()).padStart(2, "0")))]
    await customQuerytablelistenerTemplate(query(loanCol(bid), ...conditions), bid, loanStore)
}

export async function getLoansByDate(bid, from, to) {
    const conditions = [where('date', '>=', new Date(from)), where('date', '<=', new Date(dateTransfer(to),))]
    await customDocumentTablelistenerTemplate(query(loanCol(bid), ...conditions), bid, loanStore)
}

// 1. Check if expiry is == today and balance >0
// 2. If true then change status to expired
// 3. then create new debt with amount= balance * 20%
// 4. 
