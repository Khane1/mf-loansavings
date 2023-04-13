import { checkIfSignedIn } from "./firebase/auth";
import { customerTablelistener } from "./firebase/userFuncs/fb_customers";
import { getLoans } from "./firebase/userFuncs/fb_loans";
import { getReceipts } from "./firebase/userFuncs/fb_receipts";
import { getTeam } from "./firebase/userFuncs/fb_team";
import { businessStore } from "./stores";

export function refresh(bid) {
    checkIfSignedIn().then((e) => {
        if (e != null) {
            customerTablelistener(bid);
            getLoans(bid);
            getReceipts(bid);
            getTeam(bid);
        }
    });
}