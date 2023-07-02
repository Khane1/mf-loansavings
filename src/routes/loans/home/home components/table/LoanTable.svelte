<script>
	import CarryOverList from '../../../../../components/reuseable/loan/carryOverList.svelte';
	import LoanRow from '../../../../../components/reuseable/loan/loanRow.svelte';
	import Table from '../../../../../components/reuseable/tables/table.svelte';
	import { dateDiffInDays } from '../../../../../functions/func_essential';
	import Active from './active.svelte';
	import Complete from './complete.svelte';
	export let expiredLoans,
		showExpired,
		list,
		capital,
		activeLoanCustomers,
		isDetail,
		loanData,
		completeLoanCustomers;
</script>

{#if !showExpired}
	<Table headers={['', 'Borrower', 'Loan', 'interest%', 'To be paid', 'Profit', 'Paid', 'Days Left']}>
		{#if list.length > 0}
			{#if capital != 0}
				<Active bind:activeLoanCustomers bind:isDetail bind:loanData />
				<div class="mt-5" />
				<tr class="	my-3">
					<td class="underline" style="font-size: x-small;">
						<span> Loans </span>
					</td>
					<td class="underline" style="font-size: x-small;">
						<span> Completed Today </span>
					</td>
				</tr>
				<Complete bind:isDetail bind:loanData bind:completeLoanCustomers />
			{/if}
		{/if}
	</Table>
{:else}
	<Table headers={[ 'Borrower', 'Loan', 'Balance','Expired','CarryOver','Completed']}>
		{#if expiredLoans.length > 0}
		<CarryOverList bind:expiredLoans bind:isDetail bind:loanData/>
		{/if}
	</Table>{/if}
