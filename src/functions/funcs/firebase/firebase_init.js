import { initializeApp, } from 'firebase/app';
import { getAuth, } from 'firebase/auth'
import { axiosGetRoute } from '../script';
import { getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
// import { getsecrets } from '../server';
// import { userModelStore, userStore } from '../stores';
async function appInit() {
    let res = await axiosGetRoute({}, '/api/getsecrets', {});
    return res.data.secrets;
}
export const appLoad = async () => {
    const secrets = await axiosGetRoute({}, '/api/getsecrets', {});
    return secrets.data.secrets
}
let firebaseConfig = await appInit()
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export let fb_db = getFirestore(app);
export const storage = getStorage(app);

