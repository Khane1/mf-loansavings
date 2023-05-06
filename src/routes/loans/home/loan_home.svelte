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
	let searchedStatus = false;
</script>

<!-- {list.reduce((a, { data }) => a + data.toBePaid - data.balance, 0)} -->
{#if $screenSizeStore.size < 1000}
	<LoanStats />
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
				<LoanStats />
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
