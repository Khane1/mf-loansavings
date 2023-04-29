<script>
	import { onMount } from 'svelte';
	import { p_NHold } from '../../functions/func_essential';
	import { businessStore, pageRouteStore, screenSizeStore } from '../../functions/funcs/stores';
	import Customers from '../../routes/customers/customers.svelte';
	import Loans from '../../routes/loans/loans.svelte';
	import Receipts from '../../routes/receipts/receipts.svelte';
	import Settings from '../../routes/settings/settings.svelte';
	import Team from '../../routes/team/team.svelte';
	import BtnSidebar from '../reuseable/buttons/btn_sidebar.svelte';
	import HeaderSidebar from '../reuseable/title/headerSidebar.svelte';
	import DailyEx from '../../routes/dailyExpenditure/daily_Ex.svelte';
	import { fade, slide } from 'svelte/transition';
	import Hamburger from '../reuseable/buttons/hamburger/hamburger.svelte';
	import Report from '../../routes/dailyExpenditure/fullReport/report.svelte';
	import LoanStats from '../../routes/loans/home/loan_stats.svelte';
	let btnTtl =
		$screenSizeStore.size < 768
			? [
					{ name: 'Customers 😊', data: Customers },
					{ name: 'Reports 🧾', data: Report },
					{ name: 'General Stats 🤝', data: Loans },
					{ name: 'Settings ⚙️', data: Settings }
			  ]
			: [
					{ name: 'Customers 😊', data: Customers },
					{ name: 'Loans Issued 🤝', data: Loans },
					{ name: 'Teams 💪', data: Team },
					{ name: 'Receipts🧾', data: Receipts },
					// { name: 'Reports',data:Receipts },
					{ name: 'Daily Reports 📅', data: DailyEx },
					{ name: 'Settings ⚙️', data: Settings }
			  ];
	$: burger = $screenSizeStore.size < 768 ? true : false;
	onMount((e) => {
		p_NHold(btnTtl[0].name, btnTtl[0].data);
	});
</script>

{#if $screenSizeStore.size < 768}
	<div
		class="flex justify-between pr-4"
		on:click={() => {
			burger = !burger;
		}}
		on:keypress
	>
		{#if $screenSizeStore.size < 768}
		<span class="pt-4 font-semibold text-slate-600 underline">{$businessStore.name}</span>
			<Hamburger bind:burger />
		{/if}
	</div>
{/if}
<aside class={burger ? 'hidden' : ' w-68 fixed left-0 top-0 h-screen p-5'}>
	<div class="text-center">
		<HeaderSidebar title="Micro Finance Manager" />
		<h1 style="text-transform:capitalize" class="text-slate-300 text-sm">{$businessStore.name}</h1>
	</div>
	<div class="mt-5">
		<ul class="relative align-middle ">
			{#each btnTtl as item}
				<li class="relative flex justify-center">
					<BtnSidebar
						click={() => {
							p_NHold(item.name, item.data),
								$screenSizeStore.size < 768 ? (burger = !burger) : console.log();
						}}
						title={item.name}
						isActive={$pageRouteStore.pageName == item.name}
					/>
				</li>
			{/each}
		</ul>
	</div>
	<!-- <span
		class="
	pt-10
	flex underline justify-center"
	>
		View daily Report
	</span> -->
	<h1
		style="position: fixed;
    bottom: 30px;"
		class="text-slate-300 text-lg font-extrabold "
	>
		CLIQ MINI SERVICE
	</h1>
</aside>

<style>
	li {
		padding-top: 30px;
	}
	aside {
		padding: 25px;
		padding-top: 40px;
		background-color: #f4f5f6;
		/* background-color: #000d6e; */
		font-family: 'Poppins', sans-serif;
	}
</style>
