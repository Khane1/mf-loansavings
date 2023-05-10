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
	import { businessStore, capitalStore, customersStore, screenSizeStore } from '../../functions/funcs/stores';
	import AddCustomer from './addCustomer/addCustomer.svelte';
	import CustomerDetail from './customer detail/customerDetail.svelte';
	import { sortCustomers } from '../../functions/func_essential';
	import CustomerTable from './table/customerTable.svelte';
	let isDetail = false;
	let userData;
	function getData(data) {
		alert('hii');
		userData = data;
	}
	onMount((e) => {});
	$: list =
		$customersStore != undefined && $customersStore.value != undefined
			? $customersStore.value.sort((a, b) => b.data.name > a.data.name)
			: [];

	$: customers = sortCustomers(list, search);
	$: search = '';
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
					<Input
						placeholder="Search for customer"
						keydown={() => {}}
						bind:value={search}
						isText={true}
						type="text"
					/>
				</div>
				<ActionBtn click={true} title={'GO'} />
			</div>
			<AddCustomer />
		</div>

		<div class="pt-5" />
		<!-- {JSON.stringify($businessStore.BusinessId)} -->
		<CustomerTable bind:list bind:customers bind:isDetail bind:userData />
	{/if}
{/if}
