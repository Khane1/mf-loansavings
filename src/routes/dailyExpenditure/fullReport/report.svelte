<script>
	import CtmrDtl from '../../../components/reuseable/customer/ctmrDtl.svelte';
	import Table from '../../../components/reuseable/tables/table.svelte';
	import { MoneyFormat, timestampToDateTime } from '../../../functions/func_essential';
	import { reportStore, screenSizeStore } from '../../../functions/funcs/stores';
</script>

{#if $reportStore != undefined && $reportStore.value != undefined}
	{#each $reportStore.value as val}
		<div class="">
			<div class="flex justify-center pb-10">
				<h1 class="text-xl underline text-slate-800">Today's report</h1>
			</div>
			<div class={$screenSizeStore.size < 768 ? '' : ' flex justify-center  pb-20 '}>
				<div class={$screenSizeStore.size < 768 ? 'flex justify-center py-10' : ''}>
					<div class=" w-72 px-5 shadow-xl">
						<CtmrDtl title={'Date'} data={timestampToDateTime(val.data.date ?? '')} />
						<CtmrDtl title={'CapitalAdded'} data={MoneyFormat(val.data.capitalAdded ?? '')} />
						<CtmrDtl title={'ClearedLoans'} data={val.data.clearedLoans ?? ''} />
						<CtmrDtl title={'New Loans Today'} data={val.data.newLoans ?? ''} />
					</div>
				</div>
				<div>
					<div class={$screenSizeStore.size < 768 ? 'flex justify-center py-10' : ''}>
						<div class=" w-72 px-5 shadow-xl">
							<CtmrDtl title={'Inactive Clients'} data={val.data.T_No_Inactive ?? ''} />
							<CtmrDtl title={'Active Client Loans'} data={val.data.T_No_LoansToday ?? ''} />
							<div class="flex justify-end">
								<hr class="w-10" />
							</div>
							<CtmrDtl
								title={'Total No. Clients'}
								data={JSON.parse(val.data.T_No_Inactive ?? '') +
									JSON.parse(val.data.T_No_LoansToday ?? '')}
							/>
							<div class="flex justify-end">
								<hr class="w-10" />
							</div>
							<CtmrDtl title={'Active Loans paid today'} data={val.data.T_No_cus_Paid ?? ''} />

						</div>
					</div>
				</div>
				<div class={$screenSizeStore.size < 768 ? 'flex justify-center' : ''}>
					<div class="w-72 px-5 shadow-xl">
						<CtmrDtl title={'CashOut'} data={MoneyFormat(val.data.cashOut ?? '')} />
						<CtmrDtl title={'CashIn'} data={MoneyFormat(val.data.cashIn ?? '')} />

						<CtmrDtl title={'ExpenseTotal'} data={MoneyFormat(val.data.expenseTotal ?? '')} />
						<CtmrDtl title={'ClosingBalance'} data={MoneyFormat(val.data.closingBalance ?? '')} />
					</div>
				</div>
			</div>
			<div class={'flex justify-center pb-5'}>
				<h1 class="text-xl  text-slate-800">Expense/Capital Table</h1>
			</div>
			<div class={$screenSizeStore.size > 768 ? 'flex justify-center' : ''}>
				<div class={$screenSizeStore.size > 768 ? 'w-1/2 pb-10 ' : ' pb-10'}>
					<Table headers={['Item', 'Amount', 'Type']}>
						{#each val.data.expenseList as exL}
							<div class="mt-3" />
							<tr
								class="{exL.type == 'Capital' ? 'cap' : 'exp'} bg-slate-50 space-y-4"
								style="cursor: pointer;"
							>
								<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap"
									>{exL.item}
								</td>
								<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap">
									{MoneyFormat(exL.amount)}
								</td>
								<td class="text-sm font-light px-6 py-2 whitespace-nowrap">{exL.type}</td>
							</tr>
						{/each}
					</Table>
				</div>
			</div>
		</div>
	{/each}
{:else if $screenSizeStore.size < 768}
	<div class="flex justify-center text-3xl mt-20">
		<span class="rounded-full bg-gray-400 text-white px-5 py-3 shadow-xl">≠</span>
	</div>
	<div class="text-2xl flex justify-center pt-2 text-gray-600">Report is not yet submitted.</div>
	<div class="flex justify-center pt-2">Please wait for it to be submitted.</div>
{:else}
	<div class="flex justify-center text-3xl mt-20">
		<span class="rounded-full bg-gray-400 text-white px-5 py-3 shadow-xl">↗</span>
	</div>
	<div class="text-2xl flex justify-center pt-2 text-gray-600">Please create a report.</div>
	<div class="flex justify-center pt-2">Select the "Create Today's Report" button.</div>
{/if}
