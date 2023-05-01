import {
    setDoc, doc, updateDoc, collection, where, query,
} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { fb_db } from '../firebase_init';
import { customQuerytablelistenerTemplate, tablelistenerTemplate } from './fb_universal';
import { loanStore, reportStore } from '../../stores';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
const reportDoc = (businessId, reportId) => doc(fb_db, 'business', businessId, 'reports', reportId)
const reportCol = (businessId) => collection(fb_db, 'business', businessId, 'reports')
import { updateCapital } from './fb_business'
import { dateTransfer, getDateToday } from '../../../func_essential';

export async function createReport(business, report, data) {
    try {
        if (report != undefined && report[0] != undefined) {
            console.log();

            await updateDoc(reportDoc(business.BusinessId, report[0].data.reportId), data)
        } else {
            let reportId = uuidv4()
            data['reportId'] = reportId;
            try {
                await setDoc(reportDoc(business.BusinessId, reportId), data)
                await updateCapital(business.BusinessId, data['closingBalance'])
                cliq_notify('s', 'Report created')

            } catch (error) {
                cliq_notify('d', 'Error Occured Try again')
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
        alert('An error occured please try again')
    }

}

export async function getReports(bid) {
    const conditions = [where('date', '>=', new Date(getDateToday().today)), where('date', '<=', new Date(dateTransfer(new Date())))]
    await customQuerytablelistenerTemplate(query(reportCol(bid), ...conditions), bid, reportStore)
}

// 1. Check if expiry is == today and balance >0
// 2. If true then change status to expired
// 3. then create new debt with amount= balance * 20%
// 4. 