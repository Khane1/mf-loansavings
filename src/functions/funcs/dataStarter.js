import { checkIfSignedIn } from "./firebase/auth";
import { businessCapitallistener, getBusiness } from "./firebase/userFuncs/fb_business";
import { customerTablelistener } from "./firebase/userFuncs/fb_customers";
import { getReports } from "./firebase/userFuncs/fb_dailyReport";
import { getLoans } from "./firebase/userFuncs/fb_loans";
import { getReceipts } from "./firebase/userFuncs/fb_receipts";
import { getTeam } from "./firebase/userFuncs/fb_team";
import { businessStore } from "./stores";

export function refresh(bid,size) {
    checkIfSignedIn().then((e) => {
        if (e != null) {
            // customerTablelistener(bid,size);
            businessCapitallistener(bid)
            getLoans(bid);
            // getReceipts(bid);
            // getTeam(bid);
            // getReports(bid)
        }
    });
}