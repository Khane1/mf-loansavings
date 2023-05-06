<script>
	import LoanRow from "../../../../../components/reuseable/loan/loanRow.svelte";
	import Table from "../../../../../components/reuseable/tables/table.svelte";
	import { dateDiffInDays } from "../../../../../functions/func_essential";
    export let activeLoanCustomers,isDetail,loanData;
</script>

{#each activeLoanCustomers as loan, i}
	<div class="hover:text-lg my-3" />
	{#if loan.data.status == 'active'}
		<div class="mt-2" />
		<tr
			style="cursor: pointer;"
			on:click={() => ((isDetail = true), (loanData = loan.data))}
			class={loan.data.status != 'undefined' && loan.data.status != 'complete'
				? dateDiffInDays(new Date(), loan.data.loan_due.toDate()) < 5
					? 'bg-red-100 space-y-4'
					: 'bg-slate-50 space-y-4'
				: 'bg-green-100 space-y-4'}
		>
			<LoanRow loan={loan.data} index={i} />
		</tr>
	{/if}
{/each}
