import {
    setDoc, doc, updateDoc, where, query, collection, or, onSnapshot, limit
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

export async function createLoan(business, customerId, isNewLoan, data) {
    try {
        let loanId = uuidv4()
        let capital = (business.capital + data['Opening_Fee']) - data['Loan'];
        console.log(business.BusinessId, loanId, data);
        data['loanId'] = loanId;
        try {
            await setDoc(loanDoc(business.BusinessId, loanId), data)
            if (isNewLoan) {
                await updateCapital(business.BusinessId, capital)
            }
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
    let firstDate = new Date(new Date().getFullYear() + '-' + (new Date().getMonth()).toString() + '-' + '1')
    const conditions = [where('status', '==', 'active'),]
    const condition2 = [where('status', '==', 'complete'), where('lastpaid', '>', firstDate), where('lastpaid', '<=', new Date(getDateToday().today)), limit(10)]

    onSnapshot(query(loanCol(bid), ...conditions), async (activeRes) => {
        let list = [];

        if (activeRes.docs.length != 0) {
            activeRes.docs.forEach((val) => {
                if (list.filter(e => e.customerId === val.id).length == 0) {
                    list = [...list, { data: val.data(), customer_id: val.id }]
                } else {

                }
            })
        }
        onSnapshot(query(loanCol(bid), ...condition2), async (lastpaidRes) => {
            if (lastpaidRes.docs.length != 0) {
                lastpaidRes.docs.forEach((val) => {
                    if (list.filter(e => e.customerId === val.id).length == 0) {
                        list = [...list, { data: val.data(), customer_id: val.id }]
                    } else {

                    }
                })
            }
            loanStore.update((e) => {
                return { value: list, businessId: bid };
            })
        });
    })

}

export async function getLoansByDate(bid, from, to) {
    const conditions = [where('date', '>=', new Date(from)), where('date', '<=', new Date(dateTransfer(to),))]
    await customDocumentTablelistenerTemplate(query(loanCol(bid), ...conditions), bid, loanStore)
}

// 1. Check if expiry is == today and balance >0
// 2. If true then change status to expired
// 3. then create new debt with amount= balance * 20%
// 4. 
