import { cliq_notify } from "../../components/reuseable/notificationsToast/onNotify";
import { axiosGetRoute, axiosPostRoute } from "./script";
import { authstatusStore, businessStore, userAuthStore } from "./stores";

export function signUpRoute(email, password, data) {
    cliq_notify('w', 'Please wait as we create your account.')
    axiosPostRoute({ email, password, data }, '/signUp').then((res) => {
        authstatusStore.update((e) => { return { status: res.data.status, code: res.data.code } })
        if (res.data.status == 200) {
            userAuthStore.update((e) => {
                return res.data.user
            })
            businessStore.update((e) => {
                return res.data.business
            })
            cliq_notify('s', 'Your account is created.')
        } else {
            alert('Error ' + res.data.status + ' ' + res.data.data)
        }
        // console.log(res);
    })
}

export function signOutRoute() {
    axiosPostRoute({}, '/signOut').then((res) => {
        authstatusStore.update((e) => { return; })
        if (res.signout == 'successful') {
            userAuthStore.update((e) => {
                return;
            })
            businessStore.update((e) => {
                return;
            })
            cliq_notify('s', 'SignedOut')
        } else {
            alert('Error ' + res.error)
        }
        // console.log(res);
    })
}


