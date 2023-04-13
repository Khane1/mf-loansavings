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
	import { businessStore, customersStore } from '../../functions/funcs/stores';
	import AddCustomer from './addCustomer/addCustomer.svelte';
	import CustomerDetail from './customer detail/customerDetail.svelte';
	let isDetail = false;
	let userData;
	function getData(data) {
		alert('hii');
		userData = data;
	}
	onMount((e) => {});
	$: list =$customersStore.value != undefined ? $customersStore.value.sort((a, b) => b.data.name-a.data.name) : [];
	$: customers = list.filter((loan) => {
		return loan.data.name.toLowerCase().includes(search.toLowerCase());
	});
	$: search = '';
</script>

{#if isDetail}
	<CustomerDetail bind:isDetail bind:userData />
{:else}
	<div class="flex justify-between">
		<PageTitle title="Customers 😊" />

		<div class=" flex justify-start">
			<div class="w-30">
				<Input placeholder="Search for customer" keydown={() => {}} bind:value={search} isText={true} type="text" />
			</div>
			<ActionBtn click={true} title={'GO'} />
		</div>
		<AddCustomer />
	</div>

	<div class="pt-5" />
	<!-- {JSON.stringify($businessStore.BusinessId)} -->
	<div>	
		<Table headers={['Name', 'Date Opened', 'Nin', 'Status', 'Contact', 'Completed', 'Total paid']}>
			<!-- {#each  $historyDataStore as item} -->
			<div class="hover:text-lg my-3" />
			{#if list != undefined}
				<!-- {JSON.stringify($customersStore.value)} -->
				{#each customers as customer}
					{#if customer.data != undefined}
						<div class="mt-2" />
						<TableRow bind:data={customer.data} bind:isDetail bind:userData />
					{/if}
				{/each}
			{/if}
			<!-- {/each} -->
		</Table>
	</div>
{/if}
