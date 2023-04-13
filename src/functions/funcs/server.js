import { axiosGetRoute, axiosPostRoute } from "./script";
import { authstatusStore, businessStore, userAuthStore } from "./stores";

export function signUpRoute(email, password, data) {
    axiosPostRoute({ email, password, data }, '/signUp').then((res) => {
        authstatusStore.update((e) => { return { status: res.data.status, code: res.data.code } })
        if (res.data.status == 200) {
            userAuthStore.update((e) => {
                return res.data.user
            })
            businessStore.update((e) => {
                return res.data.business
            })
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
        } else {
            alert('Error ' + res.error)
        }
        // console.log(res);
    })
}


