<script>
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import Input from '../../../components/reuseable/input/input.svelte';
	import LoanUserCard from '../../../components/reuseable/loan/loanUserCard.svelte';
	import { cliq_notify } from '../../../components/reuseable/notificationsToast/onNotify';
	import TeamCard from '../../../components/reuseable/team card/teamCard.svelte';

	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { sortCustomers } from '../../../functions/func_essential';
	import { customerTablelistener } from '../../../functions/funcs/firebase/userFuncs/fb_customers';
	import {
		businessStore,
		customerSearchStore,
		customersStore
	} from '../../../functions/funcs/stores';
	import Capital from '../../stats/capital.svelte';
	import LoanList from './borrowerList/loanList.svelte';
	import GiveLoan from './giveLoan/giveLoan.svelte';
	export let newLoan;
	let giveLoan = false;
	$: list = isSearched
		? $customerSearchStore != undefined && $customerSearchStore.value != undefined
			? $customerSearchStore.value.sort((a, b) => b.data.name > a.data.name)
			: []
		: $customersStore != undefined && $customersStore.value != undefined
		? $customersStore.value
				.filter((e) => {
					return e.data.name.toLowerCase().includes(search);
				})
				.sort((a, b) => b.data.name > a.data.name)
		: [];
	$: customers = list;
	$: search = '';
	$: capital = $businessStore.capital;
	$: isSearched = false;
	function searchFunction() {
		if (!isSearched || (isSearched && customers.length == 0)) {
			if (search.length > 0) {
				isSearched = true;
				customers = sortCustomers($businessStore, list, search);
			} else cliq_notify('d', 'Please search for user by name.');
		} else {
			search = '';
			isSearched = false;
			customerTablelistener($businessStore.BusinessId);
		}
	}
</script>

<div class="flex justify-between">
	<div on:click={() => (newLoan = false)} on:keypress style="cursor:pointer">
		<PageTitle title="← Issue new loan" />
	</div>
	<div class=" flex justify-start">
		<div class="w-30">
			{#if !isSearched || (isSearched && customers.length == 0)}
				<Input
					placeholder="Search for customer"
					bind:value={search}
					keydown={() => {}}
					isText={true}
					type="text"
				/>
			{/if}
		</div>

		<ActionBtn
			click={() => searchFunction()}
			title={!isSearched || (isSearched && customers.length == 0) ? 'Search' : 'Reset'}
		/>
	</div>
</div>
{#if capital != 0}
	{#if isSearched && customers.length == 0}
		<div class="text-3xl flex justify-center pt-20 text-slate-400">No results found!</div>
		<div class="text-lg flex justify-center pt-2 text-slate-400">Press the "reset button".</div>
	{:else if !isSearched && customers.length == 0}
		<div class="text-xl flex justify-center pt-20 text-slate-400">Press the "Search button",</div>
		<div class="text-xl flex justify-center pt-2 text-slate-400">to get results for {search}.</div>
	{/if}
	<LoanList bind:giveLoan bind:customers click={() => (giveLoan = true)} />
		
{:else}
	<div>
		<Capital />
	</div>
{/if}
