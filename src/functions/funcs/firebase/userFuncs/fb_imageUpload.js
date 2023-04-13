import { storage } from "../firebase_init";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
const storageRef = (business, ref_child) => ref(storage, (business + '/' + ref_child + '.jpg'))

///////////////////////Image_Upload/////////////////////////////////////////
export async function uploadItemImage(rawfile) {
    try {
        const image = rawfile.avatar;
        // https://thehotcode.com/firebase-gcloud-fix-cors-issues/
        let snapshot = await uploadString(storageRef(rawfile.businessName, rawfile.name), image, 'data_url');
        // console.log('Uploaded a data_url string!');
        let url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.log(error);
    }
}