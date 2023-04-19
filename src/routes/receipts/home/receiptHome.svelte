<script>
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import Input from '../../../components/reuseable/input/input.svelte';
	import Search from '../../../components/reuseable/search/search.svelte';
	import SearchBy from '../../../components/reuseable/search/searchBy.svelte';
	import Table from '../../../components/reuseable/tables/table.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { MoneyFormat, timestampToDateTime } from '../../../functions/func_essential';
	import { businessStore, loanStore, receiptStore } from '../../../functions/funcs/stores';
	import {
		getReceipts,
		getReceiptsByDate
	} from '../../../functions/funcs/firebase/userFuncs/fb_receipts';
	export let addReceipt, loanDetail, loanData;
	$: list =
		$receiptStore.value != undefined
			? $receiptStore.value.sort((a, b) => b.data.last_paid - a.data.last_paid)
			: [];

	$: receipts =
		$receiptStore.value == undefined
			? []
			: $receiptStore.value
					.sort((a, b) => b.data.last_paid - a.data.last_paid)
					.filter((loan) => {
						return loan.data.borrower.toLowerCase().includes(search.toLowerCase());
					});
	$: search = '';
	let searchBy = 'name';
	let fromDate, toDate;
	let searchedState = false;
	$: total = receipts.reduce((a, { data }) => a + data.amount, 0);
</script>

<div class="flex justify-between">
	<div class="flex text-sm">
		<SearchBy bind:searchBy />
		<span class="mx-2">
			{search}, {fromDate} to {toDate}
		</span>
	</div>
	<div class="">
		<span class="text-sm border  px-2 mx-2">Results: {receipts.length}</span>
		<span class="text-sm border  px-2 mx-2">Total: {MoneyFormat(total)}</span>
	</div>
</div>
<div class="flex justify-between">
	<div class=" flex justify">
		<PageTitle title="Receipts 🧾" />
	</div>

	<div class=" flex justify-start">
		<Search bind:search bind:searchBy bind:fromDate bind:toDate />

		{#if searchedState == false && searchBy == 'date'}
			<ActionBtn
				click={() => {
					searchedState = true;
					searchBy == 'date' ? getReceiptsByDate($businessStore.BusinessId, fromDate, toDate) : {};
				}}
				title={'GO'}
			/>
		{:else if searchedState == true}
			<ActionBtn
				title={'Clear Search results'}
				click={() => {
					searchedState = false;
					fromDate = '';
					toDate = '';
					receiptStore.update((e) => {
						return [];
					});
					getReceipts($businessStore.BusinessId);
				}}
			/>
		{/if}
	</div>

	<ActionBtn click={() => (addReceipt = true)} title={'Add payment receipt ✜'} />
</div>
<div class="pt-5" />
<div>
	<Table headers={['', 'PaymentID', 'Borrower', 'Paid', 'Balance', 'Days left', 'Last paid']}>
		<div class="hover:text-lg my-3" />
		{#if $receiptStore.value != undefined}
			{#each receipts as receipt, i}
				<div class="mt-3" />
				<tr
					class=" bg-slate-50 space-y-4"
					style="cursor: pointer;"
					on:keypress
					on:click={() => {
						loanDetail = true;
						loanData =
							$loanStore.value == undefined
								? {}
								: $loanStore.value.filter((e) => e.customer_id === receipt.data.borrowerId)[0].data;
						console.log(loanData);
					}}
				>
					<!-- // loanDetail=true
				// alert(loanStore) -->
					<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap">
						{i + 1}.
					</td>
					<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap">
						{receipt.data.receiptId.substring(0, 7)}...
					</td>
					<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap">
						{receipt.data.borrower}
					</td>
					<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap">
						{MoneyFormat(receipt.data.amount)}</td
					>
					<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
						{MoneyFormat(receipt.data.balance)}
					</td>
					<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
						{receipt.data.days_left}</td
					>
					<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
						{timestampToDateTime(receipt.data.last_paid)}
					</td>
				</tr>
			{/each}
		{/if}

		<div class="mt-2" />
		<!-- {/each} -->
	</Table>
	{#if receipts.length == 0}
		No Receipts found for {!searchedState ? 'today' : fromDate + ' to ' + toDate}
	{/if}
</div>
