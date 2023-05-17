<script>
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import TableRow from '../../../components/reuseable/customer/tables/tableRow.svelte';
	import Search from '../../../components/reuseable/search/search.svelte';
	import Table from '../../../components/reuseable/tables/table.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { customerTableNext } from '../../../functions/funcs/firebase/userFuncs/fb_customers';
	import {
		businessStore,
		customerAddedStore,
		screenSizeStore
	} from '../../../functions/funcs/stores';

	export let list,
		customers,
		isDetail,
		userData,
		search = '';
</script>

<div>
	{#if $screenSizeStore.size < 768}
	
	<div class="flex justify-between border py-2 px-2">
		<span class="text-xs">Showing: {customers.length} Clients</span>
		<div class="text-xs">Total: {$businessStore.clients} Clients</div>
	</div>
		<Table headers={['Name', 'Opened', 'Contact']}>
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
	{:else}
		<Table headers={['Name', 'Date Opened', 'Nin', 'Status', 'Contact', 'Completed', 'Total paid']}>
			<!-- {#each  $historyDataStore as item} -->
			<div class="hover:text-lg my-3" />
			{#if list != undefined}
				<!-- {JSON.stringify($customersStore.value)} -->
				{#each customers as customer, i}
					{#if customer.data != undefined}
						<div class="mt-2" />
						<TableRow bind:data={customer.data} bind:isDetail bind:userData />
					{/if}
				{/each}
			{/if}
		</Table>
	{/if}
</div>
<div class="flex justify-center pt-5">
	{#if customers.length == $businessStore.clients || customers.length == 0 || $businessStore.clients <= 10 || search.length > 0}
		<div />
	{:else if customers.length == 30}
		<div class="flex justify-center">
			<div class="text-xs py-10 text-slate-500">
				<div>We load a max of 30 clients. If you want to find</div>
				<div>a specific client, please use the search feature.</div>
			</div>
			<div />
		</div>
	{:else}
		<ActionBtn
			click={() => {
				customerTableNext($businessStore.BusinessId, customers[customers.length - 1].data.name);
			}}
			title={'See more clients ↓'}
		/>{/if}
</div>
<div />
