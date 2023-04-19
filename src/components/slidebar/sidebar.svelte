<script>
	import { onMount } from 'svelte';
	import { p_NHold } from '../../functions/func_essential';
	import { businessStore, pageRouteStore } from '../../functions/funcs/stores';
	import Customers from '../../routes/customers/customers.svelte';
	import Loans from '../../routes/loans/loans.svelte';
	import Receipts from '../../routes/receipts/receipts.svelte';
	import Settings from '../../routes/settings/settings.svelte';
	import Team from '../../routes/team/team.svelte';
	import BtnSidebar from '../reuseable/buttons/btn_sidebar.svelte';
	import HeaderSidebar from '../reuseable/title/headerSidebar.svelte';
	let btnTtl = [
		{ name: 'Customers 😊', data: Customers },
		{ name: 'Loans Issued 🤝', data: Loans },
		{ name: 'Teams 💪', data: Team },
		{ name: 'Receipts / Reports 🧾', data: Receipts },
		// { name: 'Reports',data:Receipts },
		{ name: 'Settings ⚙️', data: Settings }
	];
	onMount((e) => {
		p_NHold(btnTtl[0].name, btnTtl[0].data);
	});
</script>

<aside class="w-80 fixed left-0 top-0 h-screen p-5">
	<div class="text-center">
		<HeaderSidebar title="Micro Finance Manager" />
		<h1 style="text-transform:capitalize" class="text-slate-300 text-sm">{$businessStore.name}</h1>
	</div>
	<div class="mt-12">
		<ul class="relative align-middle">
			{#each btnTtl as item}
				<li class="relative">
					<BtnSidebar
						click={() => p_NHold(item.name, item.data)}
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
