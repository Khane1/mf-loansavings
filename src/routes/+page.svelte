<script>
	import Home from './customers/customers.svelte';
	import '../app.css';
	import BtnSidebar from '../components/reuseable/buttons/btn_sidebar.svelte';
	import HeaderSidebar from '../components/reuseable/title/headerSidebar.svelte';
	import Sidebar from '../components/slidebar/sidebar.svelte';
	import Routes from './routes.svelte';
	import Avatar from '../components/reuseable/avatar/avatar.svelte';
	import AvatarName from '../components/reuseable/avatar/avatarName.svelte';
	import SmallScreen from './smallScreenErrorMessage/small_Screen.svelte';
	import OpeningScreen from './openingScreens/openingScreen.svelte';
	import { onMount } from 'svelte';
	import {
		authstatusStore,
		businessStore,
		customersStore,
		screenSizeStore,
		userAuthStore
	} from '../functions/funcs/stores';
	import { customerTablelistener } from '../functions/funcs/firebase/userFuncs/fb_customers';
	import { getLoans } from '../functions/funcs/firebase/userFuncs/fb_loans';
	import { getReceipts } from '../functions/funcs/firebase/userFuncs/fb_receipts';
	import { getTeam } from '../functions/funcs/firebase/userFuncs/fb_team';
	import { signOut } from 'firebase/auth';
	import { checkIfSignedIn } from '../functions/funcs/firebase/auth';
	import Toast from '../components/reuseable/notificationsToast/toast.svelte';
	import { refresh } from '../functions/funcs/dataStarter';
	let y;
	$: loggedIn =
		typeof window != 'undefined' && $authstatusStore != undefined && $authstatusStore.length != 0
			? $authstatusStore.code == 'authorized'
			: false;

	// function refresh() {
	// 	console.log('log');
	// 	checkIfSignedIn().then((e) => {
	// 		if (e != null) {
	// 			customerTablelistener($businessStore.BusinessId);
	// 			getLoans($businessStore.BusinessId);
	// 			getReceipts($businessStore.BusinessId);
	// 			getTeam($businessStore.BusinessId);
	// 		}
	// 	});
	// }
	$: onlineStatus = typeof window != 'undefined' ? navigator.onLine : false;
	onMount((e) => {
		screenSizeStore.update((e) => {
			return { size: y };
		});
		if (loggedIn) {
			if (typeof window != 'undefined') {
				if ($userAuthStore.name == undefined && $authstatusStore.code == 'authorized') {
					userAuthStore.update((e) => JSON.parse($userAuthStore));
				}
				refresh($userAuthStore.businessId);
			}
		}
	});
</script>

<svelte:window bind:innerWidth={y} />
{#if y > 1000}
	{loggedIn}
	{#if loggedIn}
		{#if onlineStatus}
			<div class="pl-10 flex justify-end pr-10">
				<Avatar
					src={$userAuthStore.profile ??
						'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8&w=1000&q=80'}
				/>
				<AvatarName name={$userAuthStore.name} />
			</div>
			<div class="pl-96 pt-10 px-16">
				<Routes />
			</div>
			<Sidebar />
		{:else}
			<div class="flex justify-center mt-32">
				<span class="text-4xl font-bold"> You're offline! </span>
			</div>
			<div class="flex justify-center">
				<span>Please reconnect to the internet and refresh the page.</span>
			</div>
			<h1 style="position: fixed;bottom: 30px;" class="text-slate-300 text-lg font-extrabold ">
				CLIQ MINI SERVICE
			</h1>
		{/if}
	{:else}
		<OpeningScreen />
	{/if}
{:else}
	{#if loggedIn}
		{#if onlineStatus}
		<Sidebar />
		<div class=" pt-10">
			<Routes />
		</div>
		{/if}
	{:else if typeof window != 'undefined' && $authstatusStore.code != 'authorized' && loggedIn == false}
		<OpeningScreen />
	{:else}
		<SmallScreen />
	{/if}

{/if}
<Toast />
