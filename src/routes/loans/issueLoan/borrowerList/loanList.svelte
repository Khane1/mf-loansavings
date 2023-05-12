<script>
	import { current_component } from 'svelte/internal';
	import LoanUserCard from '../../../../components/reuseable/loan/loanUserCard.svelte';
	import { customersStore } from '../../../../functions/funcs/stores';
	import GiveLoan from '../giveLoan/giveLoan.svelte';
	export let click,customers;
</script>

<div class="py-5">
	{#if $customersStore.value != undefined}
		<!-- {JSON.stringify($customersStore.value)} -->
		{#each customers as customer, i}
			{#if customer.data != undefined}
				<LoanUserCard
					index={i}
					src={customer.data.userUrl ??
						'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8&w=1000&q=80'}
					name={customer.data.name}
					status={'active'}
					title={'Give loan ✜'}
					{click}
				>
					{#if customer.data.status != 'active'}
						<GiveLoan data={customer.data} c_id={customer.customer_id} />
					{:else}
						<div class="px-5">Loan active</div>
					{/if}
				</LoanUserCard>
			{/if}
		{/each}
	{/if}
</div>
<div class="flex justify-center pt-5">
	<ul class="border shadow-sm  p-10 mt-5 rounded-lg w-82 ">
		<li>1. Search for customer by name</li>
		<li>2. Press give loan button</li>
		<li>3. Create Loan</li>
	</ul>
</div>
