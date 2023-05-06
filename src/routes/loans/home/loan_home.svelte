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
		dateDiffInDays,
		timestampToDateTime
	} from '../../../functions/func_essential';
	import {
		businessStore,
		loanStore,
		receiptStore,
		screenSizeStore
	} from '../../../functions/funcs/stores';
	import LoanStats from './loan_stats.svelte';
	import { updateCapital } from '../../../functions/funcs/firebase/userFuncs/fb_business';
	import Capital from '../../stats/capital.svelte';
	import SearchSortModal from '../../../components/reuseable/search/SearchSortModal.svelte';
	import { getLoans, getLoansByDate } from '../../../functions/funcs/firebase/userFuncs/fb_loans';
	import LoanTable from './home components/table/LoanTable.svelte';
	import { cliq_notify } from '../../../components/reuseable/notificationsToast/onNotify';
	export let newLoan, isDetail, loanData;
	let amount = 0;
	$: list =
		$loanStore != undefined && $loanStore.value != undefined
			? $loanStore.value.sort((a, b) => b.data.loan_date_iss - a.data.loan_date_iss)
			: [];
	$: search = '';
	$: complete = list.filter((loan) => {
		return (
			loan.data.balance == 0 && timestampToDateTime(loan.data.lastpaid) == new Date().toDateString()
		);
	});
	$: inComplete = list.filter((loan) => {
		return loan.data.balance > 0 && loan.data.status == 'active';
	});
	$: cashIn =
		list.reduce(
			(a, { data }) =>
				a +
				((data.newLoan == true || data.newLoan == undefined) && ///If loan is new add opening fee.
				timestampToDateTime(data.loan_date_iss) == new Date().toDateString() ////If date of Loan Issue == today add opening fee.
					? data.toBePaid + data.Opening_Fee - data.balance
					: 0),
			0
		) +
			$receiptStore !=
			undefined && $receiptStore?.value != undefined
			? $receiptStore.value.reduce((a, { data }) => a + data.amount, 0)
			: 0;
	$: loansGiven = inComplete.reduce(
		(a, { data }) =>
			a + timestampToDateTime(data.loan_date_iss) == new Date().toDateString() ////If date of Loan Issue == today add opening fee.
				? data.Loan
				: 0,
		0
	);
	let stats = false;
	$: capital = $businessStore.capital;
	let fromDate,
		toDate = '';
	$: customer = list.filter((loan) => {
		return loan.data.borrower.toLowerCase().includes(search.toLowerCase());
	});
	$: activeLoanCustomers = customer.filter((e) => {
		return e.data.status == 'active';
	});
	$: completeLoanCustomers = customer.filter((e) => {
		return e.data.status == 'complete';
	});
	$: officeFee = list
		.filter((loan) => {
			return (
				(loan.data.newLoan == true || loan.data.newLoan == undefined) &&
				timestampToDateTime(loan.data.loan_date_iss) == new Date().toDateString()
			);
		})
		.reduce((a, { data }) => a + data.Opening_Fee, 0);
	let searchedStatus = false;
</script>

<!-- {list.reduce((a, { data }) => a + data.toBePaid - data.balance, 0)} -->
{#if $screenSizeStore.size < 1000}
	<LoanStats bind:inComplete bind:complete bind:cashIn bind:loansGiven bind:officeFee />
{:else}
	<div class="flex justify-between pb-4">
		<div class="flex">
			<SearchSortModal
				title={'Loan Search by Date'}
				bind:fromDate
				bind:toDate
				submit={() => {
					if (
						fromDate != undefined &&
						toDate != undefined &&
						fromDate.length != 0 &&
						toDate.length != 0
					) {
						searchedStatus = true;
						getLoansByDate($businessStore.BusinessId, fromDate, toDate);
					} else {
						cliq_notify('d', 'You cant search without a date.');
					}
				}}
			/>

			{#if searchedStatus == true}
				<ActionBtn
					title={"Reset to this month's results"}
					click={() => {
						searchedStatus = false;
						fromDate = '';
						toDate = '';
						loanStore.update((e) => {
							return [];
						});
						getLoans($businessStore.BusinessId);
					}}
				/>{:else}
				<LoanStats bind:inComplete bind:complete bind:cashIn bind:loansGiven bind:officeFee />
			{/if}
		</div>
		<div class="">
			<span class="text-sm border  px-2 mx-2">Results: {list.length}</span>
			<!-- <span class="text-sm border  px-2 mx-2">Total: {MoneyFormat(total)}</span> -->
		</div>
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
		{#if !searchedStatus}
			<div class="text-xs">These are loans from today.</div>
		{/if}

		<div>
			<LoanTable
				bind:list
				bind:capital
				bind:activeLoanCustomers
				bind:isDetail
				bind:loanData
				bind:completeLoanCustomers
			/>
			{#if capital == 0}
				<Capital />
			{/if}
		</div>
	{/if}
{/if}
