<script>
	import LoanRow from '../../../../../components/reuseable/loan/loanRow.svelte';
	import Table from '../../../../../components/reuseable/tables/table.svelte';
	import { dateDiffInDays } from '../../../../../functions/func_essential';
	export let activeLoanCustomers, isDetail, loanData;
</script>

{#each activeLoanCustomers as loan, i}
	<div class="hover:text-lg my-3" />
	{#if loan.data.status == 'active'}
		<div class={loan.data.type == 'CarryOver' ? 'mt-0' : 'mt-2'}>
			{#if loan.data.type == 'CarryOver'}
				<div style="font-size: x-small;padding:0%;margin:0%;" class="italic ">CarryOver</div>{/if}
		</div>
		<tr
			style="cursor: pointer;"
			on:click={() => ((isDetail = true), (loanData = loan.data))}
			class={loan.data.status != 'undefined' && loan.data.status != 'complete'
				? dateDiffInDays(new Date(), loan.data.loan_due.toDate()) < 5
					? 'bg-red-100 space-y-4'
					: loan.data.type == 'CarryOver'
					? 'bg-blue-100'
					: 'bg-slate-50 space-y-4'
				: 'bg-green-100 space-y-4'}
		>
			<LoanRow loan={loan.data} index={i} />
		</tr>
	{/if}
{/each}
