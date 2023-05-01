<script>
	import { stringify } from 'postcss';
	import ActionBtn from '../../components/reuseable/buttons/actionBtn.svelte';
	import BtnOpt from '../../components/reuseable/buttons/options/btnOpt.svelte';
	import TableRow from '../../components/reuseable/customer/tables/tableRow.svelte';
	import Input from '../../components/reuseable/input/input.svelte';
	import Table from '../../components/reuseable/tables/table.svelte';
	import PageTitle from '../../components/reuseable/title/pageTitle.svelte';
	import { MoneyFormat, timestampToDateTime } from '../../functions/func_essential';
	import { createReport } from '../../functions/funcs/firebase/userFuncs/fb_dailyReport';
	import {
		businessStore,
		loanStore,
		receiptStore,
		reportStore
	} from '../../functions/funcs/stores';
	import { json } from '@sveltejs/kit';
	import CtmrDtl from '../../components/reuseable/customer/ctmrDtl.svelte';
	import Report from './fullReport/report.svelte';
	let List = [];
	let item = '';
	let amount;
	const remove = (data) => {
		List = List.filter((i) => i !== data);
	};
	let type = '';
	$: exp = (type) =>
		List.filter((item) => {
			return item.type.includes(type);
		}).reduce((a, { amount }) => a + amount, 0);
	$: sorted = (type) =>
		List.filter((item) => {
			return item.type.includes(type);
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
	$: cashIn = receiptlist.filter((e) => {
		return timestampToDateTime(e.data.last_paid) == new Date().toDateString();
	});
	$: completeLoans = cashIn.filter((e) => {
		return e.data.balance == 0;
	}).length;
	let savedReport = $reportStore != undefined && $reportStore.value != undefined;
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
							<!-- <div class="text-red-500">Required</div>
				<select class="border" name="Type" id="">
					<option value="">Type</option>
					<option value="">Capital</option>
					<option value="">Expenditure</option>
				</select> -->
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
											(List = [...List, { amount, item, type }]), (amount = ''), (item = '');
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
					<ActionBtn
						title={$reportStore != undefined && $reportStore.value != undefined
							? 'Update Report '
							: 'Save Report'}
						click={() => {
							createReport($businessStore, $reportStore.value, {
								cashIn: loanlist.reduce(
									(a, { data }) => a + (data.toBePaid + data.Opening_Fee - data.balance),
									0
								),
								no_Clientspaid: cashIn.length,
								cashOut: cashOut.reduce((a, { data }) => a + data.Loan, 0),
								closingBalance: $businessStore.capital + exp('Capital') - exp('Expenditure'),
								capitalAdded: exp('Capital'),
								expenseTotal: exp('Expenditure'),
								expenseList: List,
								clearedLoans: completeLoans,
								date: new Date()
								//  opening balance,
							});
						}}
					/>
				</div>
			{/if}
			<div>
				cashIn:{loanlist.reduce(
					(a, { data }) => a + (data.toBePaid + data.Opening_Fee - data.balance),
					0
				)}, cashOut:{cashOut.reduce((a, { data }) => a + data.Loan, 0)}, capitalAdded: {exp(
					'Capital'
				)}, expenseTotal: {exp('Expenditure')}, clearedLoans: {completeLoans},
			</div>
			<Table headers={['Item', 'Amount', 'Date', 'Type', '']}>
				{#each List as data, id}
					<div class="mt-3" />
					<tr
						class="{data.type == 'Capital'
							? 'cap'
							: 'exp'} bg-slate-50 space-y-4 hover:text-red-500"
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
						<td>&times;</td>
					</tr>
				{/each}
			</Table>
		</div>
	</div>
{:else}
	<Report />
{/if}

<!-- 
 cashIn, 
 cashOut, 
 opening balance,
 closing balance ,
 expenses, 
 List of expenses , 
 list of cashouts Today, 
 number of paying clients, 
 cleared clients

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
