import { signInWithEmailAndPassword } from "firebase/auth";
import { authstatusStore, businessStore, userAuthStore } from "../stores";
import { app, auth } from "./firebase_init";
import { getBusiness } from "./userFuncs/fb_business";
import { getUser } from "./userFuncs/fb_user";
import { cliq_notify } from "../../../components/reuseable/notificationsToast/onNotify";
import { refresh } from "../dataStarter";

export function signIn(email, password) {
    cliq_notify('s', 'Processing')
    signInWithEmailAndPassword(auth, email.trim(), password)
        .then(async function () {
            let userData = await getUser(auth.currentUser.uid)
            let businessData = await getBusiness(userData.businessId)
            userAuthStore.update((e) => { return userData })
            businessStore.update((e) => { return businessData })
            refresh(userData.businessId);
            authstatusStore.update((e) => { return { status: 200, code: 'authorized' } })
            cliq_notify('s', 'SignedIn')
        }).catch((err) => {
            updateUserStore(err)
        })
}
export async function signOut() {
    try {
        await auth.signOut();
        userAuthStore.update((e) => { return; })
        businessStore.update((e) => { return; })
        authstatusStore.update((e) => { return { status: 200, code: 'signedout' } })
        cliq_notify('d', 'SignedOut')
    } catch (error) {
        console.log(error);

    }
}
export async function checkIfSignedIn() {
    return auth.onAuthStateChanged(
        user => {
            console.log(user);
            if (user == null) {
                signOut()
                return false;
            }
        });
}

