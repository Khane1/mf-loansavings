import {
    setDoc, doc, collection,
    query, where, updateDoc,
} from '../../../../../node_modules/Firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { fb_db } from '../firebase_init';
import { customDocumentTablelistenerTemplate, customQuerytablelistenerTemplate, tablelistenerTemplate } from './fb_universal';
import { loanStore, receiptStore } from '../../stores';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
import { dateTransfer, getDateToday } from '../../../../functions/func_essential';
const receiptDoc = (businessId, receiptId) => doc(fb_db, 'business', businessId, 'receipt', receiptId)
const receiptCol = (businessId) => collection(fb_db, 'business', businessId, 'receipt')

const loanDoc = (businessId, loan_Id) => doc(fb_db, 'business', businessId, 'loans', loan_Id)
const customerDoc = (businessId, customerId) => doc(fb_db, 'business', businessId, 'customers', customerId)

export async function createReceipt(bid, data, balance, loan) {
    let receiptId = uuidv4()
    console.log(bid, receiptId, data);
    data['receiptId'] = receiptId;
    try {
        await setDoc(receiptDoc(bid, receiptId),
            data,
        )

        if (balance <= 0) {
            await updateDoc(customerDoc(bid, loan.customerId), {
                status: 'inactive',
                paid: loan.Loan
            })
            await updateDoc(loanDoc(bid, loan.loanId), {
                balance: balance
                , lastpaid: new Date(), status: 'complete'
            })
            cliq_notify('s', 'Loan Payment Complete')
        } else {
            await updateDoc(loanDoc(bid, loan.loanId), {
                balance: balance
                , lastpaid: new Date()
            })
            cliq_notify('s', 'Receipt Saved')

        }

        // .then((e) => {
        //     console.log(e);
        // })
    } catch (error) {
        console.log(error);
        cliq_notify('d', 'Error Occured Try again')
    }

}

export async function getReceipts(bid) {
    const conditions = [where('last_paid', '>=', new Date(getDateToday().today)), where('last_paid', '<=', new Date(dateTransfer(new Date())))]
    await customQuerytablelistenerTemplate(query(receiptCol(bid), ...conditions), bid, receiptStore)
}

export async function getReceiptsByDate(bid, from, to) {
    const conditions = [where('last_paid', '>=', new Date(from)), where('last_paid', '<=', new Date(dateTransfer(to)))]
    await customDocumentTablelistenerTemplate(query(receiptCol(bid), ...conditions), bid, receiptStore)
}