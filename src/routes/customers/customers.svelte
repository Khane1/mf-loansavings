<script>
	import {} from 'os';
	import { onMount } from 'svelte';
	import ActionBtn from '../../components/reuseable/buttons/actionBtn.svelte';
	import BtnSidebar from '../../components/reuseable/buttons/btn_sidebar.svelte';
	import TableRow from '../../components/reuseable/customer/tables/tableRow.svelte';
	import Input from '../../components/reuseable/input/input.svelte';
	import Table from '../../components/reuseable/tables/table.svelte';
	import HeaderSidebar from '../../components/reuseable/title/headerSidebar.svelte';
	import PageTitle from '../../components/reuseable/title/pageTitle.svelte';
	import {
		businessStore,
		capitalStore,
		customerSearchStore,
		customersStore,
		screenSizeStore
	} from '../../functions/funcs/stores';
	import AddCustomer from './addCustomer/addCustomer.svelte';
	import CustomerDetail from './customer detail/customerDetail.svelte';
	import { sortCustomers } from '../../functions/func_essential';
	import CustomerTable from './table/customerTable.svelte';
	import { cliq_notify } from '../../components/reuseable/notificationsToast/onNotify';
	import { customerTablelistener } from '../../functions/funcs/firebase/userFuncs/fb_customers';
	let isDetail = false;
	let userData;
	function getData(data) {
		alert('hii');
		userData = data;
	}
	onMount((e) => {});
	$: isSearched = false;
	$: list = isSearched
		? $customerSearchStore != undefined && $customerSearchStore.value != undefined
			? $customerSearchStore.value.sort((a, b) => b.data.name > a.data.name)
			: []
		: $customersStore != undefined && $customersStore.value != undefined
		? $customersStore.value
		.filter((e)=>{return e.data.name.toLowerCase().includes(search)})
		.sort((a, b) => b.data.name > a.data.name)
		: [];

	$: customers = list;
	$: search = '';
	function searchFunction() {
		if (!isSearched || (isSearched && customers.length == 0)) {
			if (search.length > 0) {
				customers = sortCustomers($businessStore, list, search);
				isSearched = true;
			} else cliq_notify('d', 'Please search for user by name.');
		} else {
			search = '';
			customerTablelistener($businessStore.BusinessId), (isSearched = false);
		}
	}
</script>

{#if $screenSizeStore.size < 1000}
	<div class="flex justify-between">
		<div class="mb-5 pl-2">
			<PageTitle title="Customers" />
		</div>
		<AddCustomer />
	</div>
	<div>
		<CustomerTable bind:list bind:customers bind:isDetail bind:userData />
	</div>
{/if}
{#if $screenSizeStore.size > 1000}
	{#if isDetail}
		<CustomerDetail bind:isDetail bind:userData />
	{:else}
		<div class="flex justify-between">
			<PageTitle title="Customers 😊" />

			<div class=" flex justify-start">
				<div class="w-30">
					{#if !isSearched || (isSearched && customers.length == 0)}
						<Input
							placeholder="Search for customer"
							keydown={() => {}}
							bind:value={search}
							isText={true}
							type="text"
						/>
					{/if}
				</div>
				<ActionBtn
					click={() => {
						searchFunction();
					}}
					title={!isSearched || (isSearched && customers.length == 0) ? 'Search' : 'Reset'}
				/>
			</div>
			<div class="space-x-1 flex">
				<div class="text-xs border py-2 px-2">{$businessStore.clients} Clients</div>
				<AddCustomer />
			</div>
		</div>

		<div class="pt-5" />
		<!-- {JSON.stringify($businessStore.BusinessId)} -->
		<CustomerTable bind:list bind:customers bind:isDetail bind:userData />
		{#if isSearched && customers.length == 0}
			<div class="text-3xl flex justify-center pt-20 text-slate-400">No results found!</div>
			<div class="text-lg flex justify-center pt-2 text-slate-400">Press the "reset button".</div>
		{:else if !isSearched&&customers.length==0}
		<div class="text-xl flex justify-center pt-20 text-slate-400">Press the "Search button",</div>
			<div class="text-xl flex justify-center pt-2 text-slate-400">to get results for {search}.</div>
			{/if}
	{/if}
{/if}
