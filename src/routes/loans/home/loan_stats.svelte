<script>
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { screenSizeStore } from '../../../functions/funcs/stores';
	import LoanStatsBody from './loanStatsBody.svelte';

	export let inComplete, complete, cashIn, loansGiven, officeFee;
	let formNo = 1;
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
