<script>
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import Input from '../../../components/reuseable/input/input.svelte';
	import LoanRow from '../../../components/reuseable/loan/loanRow.svelte';
	import Table from '../../../components/reuseable/tables/table.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { MoneyFormat } from '../../../functions/func_essential';
	import { loanStore } from '../../../functions/funcs/stores';
	export let newLoan, isDetail, loanData;
	$: list =
		$loanStore.value != undefined
			? $loanStore.value.sort((a, b) => b.data.loan_date_iss - a.data.loan_date_iss)
			: [];
	$: customer = list.filter((loan) => {
		return loan.data.borrower.toLowerCase().includes(search.toLowerCase());
	});
	$: search = '';
	$: total = customer.reduce((a, { data }) => a + data.balance, 0);
	$: loansGiven = customer.reduce((a, { data }) => a + data.Loan, 0);

</script>
<div class="text-sm pb-5 flex justify-end space-x-2">
	<span class="px-3 border ">
		MoneyIn:{MoneyFormat(total)}
	</span>
	<span class="px-3 border ">
		MoneyOut:{MoneyFormat(loansGiven)}
	</span>

</div>
<div class="flex justify-between">
	<PageTitle title="Loans Issued 🤝" />
	<div class=" flex justify-start">
		<div class="w-30">
			<Input
				placeholder="Search for customer"
				bind:value={search}
				keydown={() => {}}
				isText={true}
				type="text"
			/>
		</div>
		<ActionBtn click={true} title={'GO'} />
	</div>
	<ActionBtn click={() => (newLoan = true)} title={'Issue new loan ✜'} />
</div>
<div class="pt-5" />
<div>
	<Table headers={['', 'Borrower', 'Loan', 'interest%', 'To be paid', 'Profit', 'Balance', 'Date']}>
		<!-- {#each  $historyDataStore as item} -->
		<div class="hover:text-lg my-3" />
		{#if $loanStore.value != undefined}
			{#each customer as loan, i}
				<div class="mt-2" />
				<tr
					style="cursor: pointer;"
					on:click={() => ((isDetail = true), (loanData = loan.data))}
					class={loan.data.status != 'undefined' && loan.data.status != 'complete'
						? 'bg-slate-50 space-y-4'
						: 'bg-green-100 space-y-4'}
				>
					<LoanRow loan={loan.data} index={i} />
				</tr>
			{/each}
		{/if}
		<!-- {/each} -->
	</Table>
</div>
