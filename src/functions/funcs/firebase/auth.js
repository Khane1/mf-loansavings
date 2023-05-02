import { signInWithEmailAndPassword } from "firebase/auth";
import { authstatusStore, businessStore, customersStore, loanStore, receiptStore, reportStore, teamStore, userAuthStore } from "../stores";
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
            await getBusiness(userData.businessId)
            userAuthStore.update((e) => { return userData })
            refresh(userData.businessId);
            authstatusStore.update((e) => { return { status: 200, code: 'authorized' } })
            cliq_notify('s', 'SignedIn')
        }).catch((err) => {
            console.log(err)
        })
}
export async function signOut() {
    try {
        await auth.signOut();
        userAuthStore.update((e) => { return; })
        businessStore.update((e) => { return; })
        authstatusStore.update((e) => { return; })
        customersStore.update((e) => { return; })
        loanStore.update((e) => { return; })
        reportStore.update((e) => { return; })
        receiptStore.update((e) => { return; })
        teamStore.update((e) => { return; })

        authstatusStore.update((e) => { return { status: 200, code: 'signedout' } })
        cliq_notify('d', 'SignedOut')
    } catch (error) {
        console.log(error);

    }
}
export async function checkIfSignedIn() {
    return auth.onAuthStateChanged(
        user => {
            if (user == null) {
                signOut()
                return false;
            }
        });
}

