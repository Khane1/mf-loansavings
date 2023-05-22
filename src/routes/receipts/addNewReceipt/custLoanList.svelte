<script>
	import LoanUserCard from '../../../components/reuseable/loan/loanUserCard.svelte';
	import { loanStore } from '../../../functions/funcs/stores';
	import GiveLoan from '../../loans/issueLoan/giveLoan/giveLoan.svelte';
	import Addreceipt from './addReceipt/addreceipt.svelte';
	export let click,search;

	$: activeLoanCustomers =
		$loanStore != undefined && $loanStore.value != undefined
			? $loanStore.value.filter((e) => {
					return (e.data.status == 'active' || e.data.status == 'CarryOver') && e.data.borrower.toLowerCase().includes(search.toLowerCase());
			  })
			: [];
</script>

<div class="py-5">
	{#if $loanStore != undefined && $loanStore.value != undefined}
		{#each activeLoanCustomers as loan, index}
			{#if  loan.data.balance >= 0}
				<LoanUserCard
					src={loan.data.userUrl}
					name={loan.data.borrower}
					status={'active'}
					{index}
					{click}
				>
					<Addreceipt loanData={loan.data} />
				</LoanUserCard>
			{/if}
		{/each}
	{/if}
</div>
<div class="flex justify-center pt-20">
	<ul class="border shadow-sm  p-10 mt-5 rounded-lg w-82 ">
		<li>1. search for customer by name</li>
		<li>2. Press give loan button</li>
		<li>3. Create Item</li>
	</ul>
</div>
