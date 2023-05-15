<script>
	import TableRow from '../../../components/reuseable/customer/tables/tableRow.svelte';
	import Table from '../../../components/reuseable/tables/table.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { screenSizeStore } from '../../../functions/funcs/stores';

	export let list, customers, isDetail, userData;
</script>

<div>
	{#if $screenSizeStore.size < 768}
		<Table headers={['Name', 'Completed', 'Total paid']}>
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
						<TableRow bind:data={customer.data} bind:isDetail bind:userData index={i+1}/>
					{/if}
				{/each}
			{/if}
			<!-- {/each} -->
		</Table>
	{/if}
</div>
<div class="flex justify-center">
    <div class="text-xs py-10 text-slate-500">
        <div>We display a max of 10 clients. If you want to find  </div>
        <div>a specific client, please use the search feature.</div>
    </div>
</div>

