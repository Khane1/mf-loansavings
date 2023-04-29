<script>
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { MoneyFormat, calculateInterest } from '../../../functions/func_essential';
	import { businessStore, screenSizeStore } from '../../../functions/funcs/stores';
	import LoanStatsBody from './loanStatsBody.svelte';

	export let inComplete, complete, cashIn, loansGiven;
	let formNo = 1;
	$: activeRepTtl = inComplete.reduce((a, { data }) => a + (data.toBePaid - data.balance), 0);
	let interest = inComplete.reduce(
		(a, { data }) => a + calculateInterest(data.interest, data.Loan),
		0
	);
	$: capital = $businessStore.capital;
</script>

{#if $screenSizeStore.size > 1000}
	<Modal
		createTitle={'Close'}
		title={'Summary report'}
		modalTitle={'Basic Report'}
		nextButton={formNo < 1}
		nextFunc={() => {}}
		close={() => (formNo = 1)}
		action={() => {}}
	>
		<LoanStatsBody bind:inComplete bind:complete bind:cashIn bind:loansGiven />
	</Modal>
{:else}
	<div class="mb-10 pl-5">
		<PageTitle title=" General Stats" />
		<span class="text-sm bg-slate-400 px-1 text-white">All time summary.</span>
	</div>
	<LoanStatsBody bind:inComplete bind:complete bind:cashIn bind:loansGiven />
{/if}
