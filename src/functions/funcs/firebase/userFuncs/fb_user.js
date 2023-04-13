import {
    doc, updateDoc, getDoc
} from '../../../../../node_modules/Firebase/firestore';
import { userAuthStore } from '../../stores';
import { fb_db } from '../firebase_init';
import { uploadItemImage } from './fb_imageUpload';

const userDoc = (uid) => doc(fb_db, 'users', uid)

export async function getUser(uid) {
    let user = (await getDoc(userDoc(uid))).data();
    return user
}


export async function saveProfileImage(uid, rawfile) {
    let userUrl = await uploadItemImage(rawfile)
    await updateDoc(userDoc(uid), {
        profile: userUrl
    })
    getUser(uid).then((user) => {
        userAuthStore.update((e) => { return user })
    })
}