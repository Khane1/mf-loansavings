import {
    setDoc, doc, updateDoc, where, query, collection, or, onSnapshot, limit, deleteDoc, getDoc, getDocs
} from 'firebase/firestore';
import { fb_db } from '../firebase_init';
import { customDocumentTablelistenerTemplate, } from './fb_universal';
import { loanStore } from '../../stores';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
const loanDoc = (businessId, loanId) => doc(fb_db, 'business', businessId, 'loans', loanId)
const loanCol = (businessId,) => collection(fb_db, 'business', businessId, 'loans')
import { uuidv4 } from '@firebase/util';

const customerDoc = (businessId, customerId) => doc(fb_db, 'business', businessId, 'customers', customerId)
import { updateCapital } from './fb_business'
import { dateDiffInDays, dateTransfer, getcustomDayOfMonth, timestampToDateTime } from '../../../func_essential';

export async function createLoan(business, customerId, isNewLoan, data, loanId) {
    try {
        let capital = (business.capital + data['Opening_Fee']) - data['Loan'];
        console.log(business.BusinessId, loanId, data);
        data['loanId'] = loanId;
        try {
            await setDoc(loanDoc(business.BusinessId, loanId), data)
            await updateDoc(customerDoc(business.BusinessId, customerId), {
                status: data['status']
            })
            if (isNewLoan) {
                await updateCapital(business.BusinessId, capital)
            }
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
    const date = new Date();
    const yesterday = getcustomDayOfMonth(
        date.getFullYear(),
        date.getMonth(),
        date.getDate())
    const conditions = [where('status', '==', 'active'),]
    const condition2 = [where('status', '==', 'complete'), where('lastpaid', '>=', yesterday),]

    onSnapshot(query(loanCol(bid), ...conditions), async (activeRes) => {
        let list = [];

        if (activeRes.docs.length != 0) {
            activeRes.docs.forEach((val) => {
                // checkLoanStatus(bid, val.data())
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
export async function deleteLoan(business, loanData) {
    try {
        // await deleteDoc(loanDoc(business.BusinessId, loanData.loanId))
        const conditions = [where('borrower', '==', loanData.borrower), where('status', '==', 'active'), where('balance', '>', 0)]
        let ifLoansExist = await getDocs(query(loanCol(business.BusinessId), ...conditions))
        if (ifLoansExist.docs.length > 1) {
            await deleteDoc(loanDoc(business.BusinessId, loanData.loanId)).then((e) => {
                cliq_notify('s', 'Deleted')
            })
        } else {
            let confirmDelete = prompt("This is the only active loan under " + loanData.borrower + '\'s name. Are you sure you want delete the loan, type "Confirm" if yes. To exit close this prompt.', "");
            switch (confirmDelete) {
                case "Confirm":
                    await deleteDoc(loanDoc(business.BusinessId, loanData.loanId)).then(async (e) => {
                        await updateDoc(customerDoc(business.BusinessId, loanData.customerId), {
                            status: 'inactive'
                        })
                        cliq_notify('s', 'Deleted')
                    })
                    break;
                default:
                    alert('I didn\'t get that, please try again.')
            }
        }
    } catch (error) {
        console.log(error);
    }
}
let completelist = []
export async function checkLoanStatus(bid, loan) {
    try {
        if (dateDiffInDays(new Date(), loan.loan_due.toDate()) > 0 && !completelist.includes(loan.customerId)) {
            let newLoan = convertToNewLoan(loan);
            loan['status'] = 'CarryOver'
            loan['CarryOverID'] = newLoan.loanId
            await updateDoc(loanDoc(bid, loan.loanId), loan)
            await setDoc(loanDoc(bid, newLoan.loanId), newLoan)
            cliq_notify('s', 'CarryOver Success')
            completelist = [...completelist, loan.customerId]
        }else cliq_notify('w', 'Can\'t update loan')
    } catch (error) {
        cliq_notify('d', 'CarryOver Failed')
    }

}

export async function getLoansByDate(bid, from, to) {
    const conditions = [where('date', '>=', new Date(from)), where('date', '<=', new Date(dateTransfer(to),))]
    await customDocumentTablelistenerTemplate(query(loanCol(bid), ...conditions), bid, loanStore)
}


function convertToNewLoan(loan) {
    let loanId = uuidv4();
    let loan_due = convertTimeAndIncrement(loan.loan_due, true)
    let interest = parseInt(loan.interest) / parseInt(loan.Loan) * parseInt(loan.balance)
    let loan_date_iss = convertTimeAndIncrement(loan.loan_due, false);
    return {
        borrower: loan.borrower,
        customerId: loan.customerId,
        Loan: loan.balance,
        toBePaid: loan.balance + interest,
        lastpaid: '',
        balance: loan.balance + interest,
        collateral: loan.collateral,
        interest: interest,
        loan_term: dateDiffInDays(loan_date_iss, loan_due),
        Opening_Fee: 0,
        type: 'CarryOver',
        loan_date_iss: convertTimeAndIncrement(loan.loan_due, false),
        loan_due,
        date: new Date(),
        loan_date_iss,
        userUrl: loan.userUrl,
        status: 'active',
        newLoan: loan.newLoan,
        loanId: loanId

    }
}
function convertTimeAndIncrement(date, incre) {
    let dateTime = new Date(date.toDate())
    let newDate = getcustomDayOfMonth(dateTime.getFullYear(), + incre ? parseInt(dateTime.getMonth() + 1) : dateTime.getMonth(), dateTime.getDate())
    return newDate
}