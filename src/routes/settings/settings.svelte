<script>
	import { fly, fade } from 'svelte/transition';

	import AccountSettings from './pages/accountSettings.svelte';
	import Contactus from './pages/contactus.svelte';
	import Logout from './pages/logout.svelte';
	import PageTitle from '../../components/reuseable/title/pageTitle.svelte';
	import { screenSizeStore, userAuthStore } from '../../functions/funcs/stores';
	import TeamSettings from './pages/teamSettings.svelte';
	import { execRights } from '../../functions/func_essential';
	import PersonalSettings from './pages/personalSettings.svelte';
	$: drawerLink = true;
	let page = 1;
	function changePage(pg) {
		page = pg;
		drawerLink = !drawerLink;
	}
</script>

{#if $screenSizeStore.size > 768}
	<div class="mx-32">
		<PageTitle title="Settings ⚙️" />

		<div class="mt-10 flex  justify-evenly">
			<div class=" w-1/2 space-y-10">
				<div on:keypress on:click={() => changePage(1)}>
					<span class={page == 1 ? 'isActive px-3' : ''}> Account Settings </span>
				</div>
				<div on:keypress on:click={() => changePage(2)}>
					<span class={page == 2 ? 'isActive px-3' : ''}> Personal Settings </span>
				</div>
				<!-- {#if execRights($userModelStore)} -->
				<div on:keypress on:click={() => changePage(3)}>
					<span class={page == 3 ? 'isActive px-3 ' : ''}> Team </span>
				</div>
				<!-- {/if} -->
				<div on:keypress on:click={() => changePage(4)}>
					<span class={page == 4 ? 'isActive px-3' : ''}> Contact Us </span>
				</div>
				<div on:keypress on:click={() => changePage(5)}>
					<span class={page == 5 ? 'isActive px-3' : ''}> LogOut </span>
				</div>
			</div>

			<div class="border shadow rounded-md h-full w-full ">
				{#if page == 1}
					<AccountSettings />
				{:else if page == 2}
					<PersonalSettings />
				{:else if page == 3 && execRights($userAuthStore)}
					<!-- <ReviewSettings /> -->
					<TeamSettings />
				{:else if page == 4}
					<Contactus />
				{:else if page == 5}
					<Logout />
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="mx-10 space-y-5 pb-10">
        <div class="shadow px-5">
            <AccountSettings />
        </div>
        <div class="shadow px-5">
            <PersonalSettings />
        </div>
        <div class="shadow">
            <Logout />
        </div>
	</div>
	<!-- <Drawer changePage={changePage} bind:page execRights={execRights} bind:drawerLink/> -->
{/if}

<style>
	.isActive {
		background-color: rgb(239, 239, 239);
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 20px;
		padding-right: 20px;
	}
</style>
