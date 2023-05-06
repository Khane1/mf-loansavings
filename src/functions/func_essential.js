import { pageRouteStore } from "./funcs/stores";

export let p_NHold = (name, data) => {
    if (typeof window !== undefined) {
        pageRouteStore.update((e) => {
            console.log(name);
            return { pageName: name, data: data };
        });
    }
}
/////////////////////////////////////
/////////////Money Functions//////////
export function MoneyFormat(val, hasCurr) {
    return hasCurr || hasCurr == undefined ? 'ugx.' + Intl.NumberFormat("en-US").format(val) : Intl.NumberFormat("en-US").format(val);
}

export function calculateInterest(a, b) {
    return Math.round((a / b) * 100)
}




/////////////////////////////////////
/////////////ROLES & RIGHTS//////////
export let roles = { admin: 'admin', manager: 'manager', cashier: 'cashier', fieldAgent: 'fieldAgent', unallocated: 'unallocated' };

export function execRights(user) {
    return (user.role == roles.manager ||
        user.role == roles.admin)
}



///////////////////////////////////////////////
//////////////List Functions////////////////////
export function sortCustomers(list, search) {
    return list
        .sort(function (a, b) {
            if (a.data.name.charAt(0).toUpperCase() < b.data.name.charAt(0).toUpperCase()) {
                return -1;
            }
            if (a.data.name.charAt(0).toUpperCase() > b.data.name.charAt(0).toUpperCase()) {
                return 1;
            }
            return 0;
        })
        .filter((loan) => {
            return loan.data.name.toLowerCase().includes(search.toLowerCase());
        });
}
export function sortReceipts(savedList) {
    let newList = [];
       savedList.forEach(element => {
        element['saved']=true
        newList=[...newList,element];
       });
    return newList;
}

////////////////Time functions///////////////
/////////////////////////////////////////////
export function timestampToDateTime(date) {
    return date == undefined || date.length == 0 ? '' : date.toDate().toDateString();
}
export function getDateToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return { today: today, year: yyyy, month: mm, day: dd };
}

export function dateTransfer(date) {
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    // today = yyyy + "/" + mm + "/" + dd;
    return yyyy + '-' + mm + '-' + (parseInt(dd) + 1);
}
export function customDate(date) {
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    // today = yyyy + "/" + mm + "/" + dd;
    return yyyy + '-' + mm + '-' + (parseInt(dd) + 1);
}


export function convertDate4InputMin() {
    const offset = new Date().getTimezoneOffset()
    let yourDate = new Date(new Date().getTime() - (offset * 60 * 1000))
    return yourDate.toISOString().split('T')[0]
}
export function convertCustomDate4InputMin(date) {
    const offset = new Date(date).getTimezoneOffset()
    let yourDate = new Date(new Date(date).getTime() - (offset * 60 * 1000))
    return yourDate.toISOString().split('T')[0]
}
// a and b are javascript Date objects
export function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}
export function getcustomDayOfMonth(year, month, date) {
    return new Date(year, month, date);
}

export function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
}