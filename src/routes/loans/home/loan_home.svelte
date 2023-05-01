<script>
	import { stringify } from 'postcss';
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import Input from '../../../components/reuseable/input/input.svelte';
	import LoanRow from '../../../components/reuseable/loan/loanRow.svelte';
	import Table from '../../../components/reuseable/tables/table.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import {
		MoneyFormat,
		calculateInterest,
		dateDiffInDays
	} from '../../../functions/func_essential';
	import { businessStore, loanStore, screenSizeStore } from '../../../functions/funcs/stores';
	import LoanStats from './loan_stats.svelte';
	import { updateCapital } from '../../../functions/funcs/firebase/userFuncs/fb_business';
	import Capital from '../../stats/capital.svelte';
	import SearchSortModal from '../../../components/reuseable/search/SearchSortModal.svelte';
	import { getLoans, getLoansByDate } from '../../../functions/funcs/firebase/userFuncs/fb_loans';
	export let newLoan, isDetail, loanData;
	let amount = 0;
	$: list =
		$loanStore != undefined && $loanStore.value != undefined
			? $loanStore.value.sort((a, b) => b.data.loan_date_iss - a.data.loan_date_iss)
			: [];
	$: customer = list.filter((loan) => {
		return loan.data.borrower.toLowerCase().includes(search.toLowerCase());
	});
	$: search = '';
	$: complete = list.filter((loan) => {
		console.log(loan.data.balance);
		return loan.data.balance == 0;
	});
	$: inComplete = list.filter((loan) => {
		console.log(loan.data.balance);
		return loan.data.balance > 0;
	});
	$: cashIn = list.reduce(
		(a, { data }) => a + (data.toBePaid + data.Opening_Fee - data.balance),
		0
	);
	$: loansGiven = inComplete.reduce((a, { data }) => a + data.Loan, 0);
	let stats = false;
	$: capital = $businessStore.capital;
	let fromDate,
		toDate = '';
	let searchedState = false;
</script>

{#if $screenSizeStore.size < 1000}
	<LoanStats bind:inComplete bind:complete bind:cashIn bind:loansGiven />
{:else}
	<div class="flex pb-4">
		<SearchSortModal
			title={'Loan Search by Date'}
			bind:fromDate
			bind:toDate
			submit={() => {
				searchedState = true;
				getLoansByDate($businessStore.BusinessId, fromDate, toDate);
			}}
		/>
		{#if searchedState == true}
			<ActionBtn
				title={"Reset to this month's results"}
				click={() => {
					searchedState = false;
					fromDate = '';
					toDate = '';
					loanStore.update((e) => {
						return [];
					});
					getLoans($businessStore.BusinessId);
				}}
			/>
		{/if}
		<LoanStats bind:inComplete bind:complete bind:cashIn bind:loansGiven />
	</div>
	{#if !stats}
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
			<Table
				headers={['', 'Borrower', 'Loan', 'interest%', 'To be paid', 'Profit', 'Paid', 'Date']}
			>
				{#if list.length > 0}
					{#if capital != 0}
						<!-- {#each  $historyDataStore as item} -->
						<div class="hover:text-lg my-3" />
						{#each customer as loan, i}
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
						{/each}

						<!-- {/each} -->
					{/if}
				{/if}
			</Table>
			{#if capital == 0}
				<Capital />
			{/if}
		</div>
	{/if}
{/if}
