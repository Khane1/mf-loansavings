<script>
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import Input from '../../../components/reuseable/input/input.svelte';
	import LoanUserCard from '../../../components/reuseable/loan/loanUserCard.svelte';
	import TeamCard from '../../../components/reuseable/team card/teamCard.svelte';

	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { businessStore, customersStore } from '../../../functions/funcs/stores';
	import Capital from '../../stats/capital.svelte';
	import LoanList from './borrowerList/loanList.svelte';
	import GiveLoan from './giveLoan/giveLoan.svelte';
	export let newLoan;
	let giveLoan = false;

	$: customers = $customersStore.value.filter((customer) => {
		return customer.data.name.toLowerCase().includes(search.toLowerCase());
	});
	$: search = '';
	$: capital = $businessStore.capital;
</script>

<div class="flex justify-between">
	<div on:click={() => (newLoan = false)} on:keypress style="cursor:pointer">
		<PageTitle title="← Issue new loan" />
	</div>
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
</div>
{#if capital != 0}
	<LoanList bind:giveLoan bind:customers click={() => (giveLoan = true)} />
{:else}
	<div>
		<Capital />
	</div>
{/if}
