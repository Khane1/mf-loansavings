import {
    setDoc, doc, collection,
    query, where, updateDoc, getDoc,
} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { fb_db } from '../firebase_init';
import { customDocumentTablelistenerTemplate, customQuerytablelistenerTemplate, tablelistenerTemplate } from './fb_universal';
import { loanStore, receiptStore } from '../../stores';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
import { dateTransfer, getDateToday } from '../../../../functions/func_essential';
import { updateCapital } from './fb_business';
const receiptDoc = (businessId, receiptId) => doc(fb_db, 'business', businessId, 'receipt', receiptId)
const receiptCol = (businessId) => collection(fb_db, 'business', businessId, 'receipt')

const loanDoc = (businessId, loan_Id) => doc(fb_db, 'business', businessId, 'loans', loan_Id)
const customerDoc = (businessId, customerId) => doc(fb_db, 'business', businessId, 'customers', customerId)

export async function createReceipt(business, data, balance, loan,) {
    let receiptId = uuidv4()
    let capital = business.capital + data['amount'];
    console.log(business.BusinessId, receiptId, data);
    data['receiptId'] = receiptId;

    try {
        await setDoc(receiptDoc(business.BusinessId, receiptId),
            data,
        )

        await updateCapital(business.BusinessId, capital);

        if (balance <= 0) {
            let customer = (await getDoc(customerDoc(business.BusinessId, loan.customerId))).data()
            await updateDoc(customerDoc(business.BusinessId, loan.customerId), {
                status: 'inactive', completed: parseInt(customer.completed) + 1,
                paid: parseInt(loan.Loan) + parseInt(customer.paid)
            })
            await updateDoc(loanDoc(business.BusinessId, loan.loanId), {
                balance: balance,
                lastpaid: new Date(), status: 'complete'
            })
            cliq_notify('s', 'Loan Payment Complete')
        } else {
            await updateDoc(loanDoc(business.BusinessId, loan.loanId), {
                balance: balance
                , lastpaid: new Date()
            })
            cliq_notify('s', 'Receipt Saved')

        }
    } catch (error) {
        console.log(error);
        cliq_notify('d', 'Error Occured Try again')
    }

}

export async function getReceipts(bid) {
    console.log(getDateToday().today);
    console.log(dateTransfer(new Date()));
    const conditions = [where('last_paid', '>=', new Date(getDateToday().today)), where('last_paid', '<=', new Date(dateTransfer(new Date())))]
    await customQuerytablelistenerTemplate(query(receiptCol(bid), ...conditions), bid, receiptStore)
}

export async function getReceiptsByDate(bid, from, to) {
    const conditions = [where('last_paid', '>=', new Date(from)), where('last_paid', '<=', new Date(dateTransfer(to)))]
    await customDocumentTablelistenerTemplate(query(receiptCol(bid), ...conditions), bid, receiptStore)
}