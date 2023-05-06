<script>
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { timestampToDateTime } from '../../../functions/func_essential';
	import { loanStore, receiptStore, screenSizeStore } from '../../../functions/funcs/stores';
	import LoanStatsBody from './loanStatsBody.svelte';
	let formNo = 1;
	$: list =
		$loanStore != undefined && $loanStore.value != undefined
			? $loanStore.value.sort((a, b) => b.data.loan_date_iss - a.data.loan_date_iss)
			: [];
	$: inComplete = list.filter((loan) => {
		return loan.data.balance > 0 && loan.data.status == 'active';
	});
	$: complete = list.filter((loan) => {
		return (
			loan.data.balance == 0 && timestampToDateTime(loan.data.lastpaid) == new Date().toDateString()
		);
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
	$: officeFee = list
		.filter((loan) => {
			return (
				(loan.data.newLoan == true || loan.data.newLoan == undefined) &&
				timestampToDateTime(loan.data.loan_date_iss) == new Date().toDateString()
			);
		})
		.reduce((a, { data }) => a + data.Opening_Fee, 0);
</script>

{#if $screenSizeStore.size > 1000}
	<Modal
		pushDown={true}
		createTitle={'Close'}
		title={'Summary report'}
		modalTitle={'Table Summary'}
		nextButton={formNo < 1}
		nextFunc={() => {}}
		close={() => (formNo = 1)}
		action={() => {}}
	>
		<LoanStatsBody bind:inComplete bind:complete bind:cashIn bind:loansGiven bind:officeFee />
	</Modal>
{:else}
	<div class="mb-10 pl-5">
		<PageTitle title=" General Stats" />
		<span class="text-sm bg-slate-400 px-1 text-white">All time summary.</span>
	</div>
	<LoanStatsBody bind:inComplete bind:complete bind:cashIn bind:loansGiven bind:officeFee />
{/if}
