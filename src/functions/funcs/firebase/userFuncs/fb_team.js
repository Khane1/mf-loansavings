
import {
    setDoc, doc,
} from 'Firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { fb_db } from '../firebase_init';
import { tablelistenerTemplate } from './fb_universal';
import { teamStore } from '../../stores';
import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
import { uploadItemImage } from './fb_imageUpload';
const memberDoc = (businessId, memberId) => doc(fb_db, 'business', businessId, 'team', memberId)

export async function addNewTeamMember(bid, rawfile, data) {
    try {
        let memberUrl = await uploadItemImage(rawfile)
        let memberId = uuidv4()
        console.log(bid, memberId, data);
        data['memberId'] = memberId;
        data['memberUrl'] = memberUrl;
        try {
            await setDoc(memberDoc(bid, memberId), data)
            cliq_notify('s', 'Team member added')

        } catch (error) {
            cliq_notify('d', 'Error Occured Try again')
            console.log(error);
        }
    } catch (error) {
        console.log(error);
        cliq_notify('d', 'Error Occured Try again')

        // alert('An error occured please try again')
    }

}

export async function getTeam(bid,) {
    let cltn = 'business/' + bid + '/team'
    await tablelistenerTemplate(cltn, bid, teamStore)
}