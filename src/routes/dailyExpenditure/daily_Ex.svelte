<script>
	import { stringify } from 'postcss';
	import ActionBtn from '../../components/reuseable/buttons/actionBtn.svelte';
	import BtnOpt from '../../components/reuseable/buttons/options/btnOpt.svelte';
	import TableRow from '../../components/reuseable/customer/tables/tableRow.svelte';
	import Input from '../../components/reuseable/input/input.svelte';
	import Table from '../../components/reuseable/tables/table.svelte';
	import PageTitle from '../../components/reuseable/title/pageTitle.svelte';
	import { MoneyFormat, sortReceipts, timestampToDateTime } from '../../functions/func_essential';
	import { createReport } from '../../functions/funcs/firebase/userFuncs/fb_dailyReport';
	import {
		businessStore,
		customersStore,
		loanStore,
		receiptStore,
		reportStore
	} from '../../functions/funcs/stores';
	import { json } from '@sveltejs/kit';
	import CtmrDtl from '../../components/reuseable/customer/ctmrDtl.svelte';
	import Report from './fullReport/report.svelte';
	$: reportStoreList =
		$reportStore != undefined && $reportStore.value != undefined
			? sortReceipts($reportStore.value[0].data.expenseList)
			: [];
	// sort through the list
	// add status saved
	$: List = reportStoreList;
	let item = '';
	let amount;
	const remove = (data) => {
		if (sorted(data.item, data.amount).length == 0) {
			List = List.filter((i) => i !== data);
		}
	};
	let type = '';
	$: exp = (type) =>
		List.filter((item) => {
			return !item.saved && item.type.includes(type);
		}).reduce((a, { amount }) => a + amount, 0);
	$: cap_expTotal = (type) => {
		let list = [];
		list = List.filter((item) => {
			return item.type.includes(type);
		});
		return list.length > 0 ? list.reduce((a, { amount }) => a + amount, 0) : 0;
	};
	$: sorted = (itemVal, amount) =>
		reportStoreList.filter((item) => {
			return item.item.includes(itemVal) && item.amount.toString().includes(amount);
		});
	$: loanlist =
		$loanStore != undefined && $loanStore.value != undefined
			? $loanStore.value.sort((a, b) => b.data.loan_date_iss - a.data.loan_date_iss)
			: [];

	$: cashOut = loanlist.filter((e) => {
		return timestampToDateTime(e.data.loan_date_iss) == new Date().toDateString();
	});
	$: receiptlist =
		$receiptStore != undefined && $receiptStore.value != undefined
			? $receiptStore.value.sort((a, b) => b.data.last_paid - a.data.last_paid)
			: [];
	$: loansToday = loanlist.filter((e) => {
		return timestampToDateTime(e.data.loan_date_iss) == new Date().toDateString();
	});
	$: cashIn =
		loansToday.reduce(
			(a, { data }) =>
				a +
				(data.newLoan == true ||
				(data.newLoan != undefined &&
					timestampToDateTime(data.loan_date_iss) == new Date().toDateString())
					? data.toBePaid + data.Opening_Fee - data.balance
					: 0),
			0
		) + receiptlist.reduce((a, { data }) => a + data.amount, 0);
	$: completeLoans = loansToday.filter((e) => {
		return e.data.balance == 0;
	}).length;
	let savedReport = $reportStore != undefined && $reportStore.value != undefined;
	$: areEqual = (array1, array2) => {
		return JSON.stringify(array1) === JSON.stringify(array2);
	};
	$: getCustomersPaid = () => {
		let Ids = [];
		$receiptStore.value.forEach((receipt) => {
			$loanStore.value.forEach((loan) => {
				if (
					receipt.data.borrowerId == loan.data.customerId &&
					!Ids.includes(receipt.data.borrowerId)
				) {
					console.log(receipt.data.borrowerId);
					Ids = [...Ids, receipt.data.borrowerId];
				}
			});
		});
		return Ids;
	};
	$: T_No_Inactive = JSON.stringify(
		$customersStore != undefined && $customersStore.value != undefined
			? $customersStore.value.length - $loanStore.value.length
			: 0
	);
	$: T_No_LoansToday =
		$loanStore != undefined && $loanStore.value != undefined ? $loanStore.value.length : 0;
	$: newLoans = loansToday.length;
	$: T_No_cus_Paid = JSON.stringify(getCustomersPaid().length);
</script>

<span class="text-sm"> Capital/Expenditure </span>
<div class="flex justify-between">
	<PageTitle title="Daily Report" />
	<span
		class="border px-3 py-1 text-sm"
		on:keypress
		on:click={() => {
			savedReport = !savedReport;
		}}
	>
		{savedReport
			? $reportStore != undefined && $reportStore.value != undefined
				? "Update today's "
				: "Create Today's "
			: 'Switch To saved'} Report</span
	>
</div>
{#if !savedReport}
	<div class="flex justify-evenly mt-5">
		<div class="flex justify-center ">
			<div>
				<div class="w-72 space-y-5 p-5 shadow-lg rounded-lg py-5">
					<span class="text-sm underline flex justify-center"> Add To Today's Report </span>
					<div>
						<div class="text-sm flex justify-evenly space-x-1">
							<BtnOpt
								click={() => {
									type = 'Expenditure';
								}}
								active={type == 'Expenditure'}
								name={'Expenditure'}
							/>
							<BtnOpt
								click={() => {
									type = 'Capital';
								}}
								active={type == 'Capital'}
								name={'Capital'}
							/>
						</div>
					</div>
					{#if type == 'Expenditure'}
						<Input
							bind:value={item}
							placeholder="Item name"
							keydown={() => {}}
							isText={true}
							type={'text'}
						/>
						<span class="text-sm font-medium text-slate-600">What did you spend on?</span>
						<Input
							bind:value={amount}
							placeholder="Amount"
							keydown={() => {}}
							isText={false}
							type="number"
						/>
						<span class="text-sm font-medium text-slate-600">How much did you spend?</span>

						<div class="flex justify-center">
							{#if amount > 0 && item.length > 0}
								<span
									class="bg-slate-500 shadow-lg border text-xs text-white rounded px-3 py-1"
									on:keypress
									on:click={() => {
										if (item != '') {
											item = List = [...List, { amount, item, type }];
											amount = '';
											item = '';
										}
									}}>Add to List ✜</span
								>{/if}
						</div>
					{:else if type == 'Capital'}
						<Input
							bind:value={amount}
							placeholder="Amount"
							keydown={() => {}}
							isText={false}
							type="number"
						/>
						<span class="text-sm font-medium text-slate-600">How much Capital are you adding?</span>

						<div class="flex justify-center">
							{#if amount > 0}
								<span
									class="bg-slate-500 shadow-lg text-xs text-white rounded px-3 py-1"
									on:keypress
									on:click={() => {
										item = type;
										if (amount != 0) {
											(List = [...List, { amount, item, type, saved: false }]),
												(amount = ''),
												(item = '');
										}
									}}>Add to List ✜</span
								>{/if}
						</div>
					{/if}
					<div class="text-xs text-center">
						NB : Please press the "Save report" button when you complete the report.
					</div>
				</div>
			</div>
		</div>
		<div />
		<div class="w-1/2 pt-10">
			{#if List.length >= 1}
				<div class="flex justify-end" />
				<div class="flex justify-end">
					<div class="text-xs  flex justify-evenly">
						<div class="border py-2 px-4 bg-orange-500 text-white">
							Expenditure:-{exp('Expenditure')}
						</div>
						<div class="border py-2 px-4 bg-green-500 text-white">
							Capital:+{exp('Capital')}
						</div>
					</div>
					{#if !areEqual(List, reportStoreList) || reportStoreList.length == 0}
						<ActionBtn
							title={$reportStore != undefined && $reportStore.value != undefined
								? 'Update Report '
								: 'Save Report'}
							click={() => {
								createReport(
									$businessStore,
									$reportStore != undefined && $reportStore.value != undefined
										? $reportStore.value
										: undefined,
									{
										cashIn: cashIn,
										cashOut: cashOut.reduce((a, { data }) => a + data.Loan, 0),
										closingBalance: $businessStore.capital + exp('Capital') - exp('Expenditure'),
										capitalAdded: cap_expTotal('Capital'),
										expenseTotal: cap_expTotal('Expenditure'),
										expenseList: List,
										clearedLoans: completeLoans,
										date: new Date(),
										T_No_Inactive,
										T_No_LoansToday,
										T_No_cus_Paid,
										newLoans
										//  opening balance,
									}
								);
							}}
						/>{/if}
				</div>
			{/if}
			<div>
				cashIn:{cashIn}, cashOut:{cashOut.reduce((a, { data }) => a + data.Loan, 0)}, capitalAdded: {exp(
					'Capital'
				)}, expenseTotal: {exp('Expenditure')}, clearedLoans: {completeLoans},
			</div>
			<Table headers={['Item', 'Amount', 'Date', 'Type', '']}>
				{#each List as data, id}
					<div class="mt-3 " />
					<tr
						class="{(data.type == 'Capital' ? 'cap' : 'exp',
						!data.saved ? 'hover:text-red-500' : '')} bg-slate-50 space-y-4"
						style="cursor: pointer;"
						on:keypress
						on:click={() => remove(data)}
					>
						<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap"
							>{data.item}
						</td>
						<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap">
							{MoneyFormat(data.amount)}
						</td>
						<td class="text-sm font-light px-6 py-2 whitespace-nowrap"
							>{new Date().toDateString()}</td
						>
						<td class="text-sm font-light px-6 py-2 whitespace-nowrap">{data.type}</td>
						{#if !data.saved}
							<td> &times;</td>
						{/if}
					</tr>
				{/each}
			</Table>
		</div>
	</div>
{:else}
	<Report />
{/if}

<!-- 
	Have a part where the business is able to put 
	current cash balance in safe
	this should help make data clear. 
	This value will be interacted with all 
	through the transactions (cashin,cashOut,expenditure etc.) -->
<style>
	.cap {
		background-color: #39f17922;
	}
	.exp {
		background-color: #4141410a;
	}
</style>
