import { writable } from 'svelte/store'
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"

////// app state stores
export let pageRouteStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'page')
export let screenSizeStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'screenSize')
export let loadingStateStore = writable([]);

/////Data model stores.
export let userAuthStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'userAuth')
export let businessStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'business')
export let capitalStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'capital')
export let authstatusStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'status')
export let customersStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'customers')
export let customerSearchStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'customerSearch')
export let loanStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'loan')
export let reportStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'report')
export let receiptStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'receipts')
export let teamStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'team')
export let emailStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'email')
// export let authstatusStore = persist(writable([]),typeof window!==undefined? createLocalStorage():{}, 'status')




