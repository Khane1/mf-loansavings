<script>
	import CtmrDtl from '../../../components/reuseable/customer/ctmrDtl.svelte';
	import { MoneyFormat, timestampToDateTime } from '../../../functions/func_essential';
	import { businessStore, loanStore, receiptStore } from '../../../functions/funcs/stores';
	$: inComplete = list.filter((loan) => {
		return loan.data.balance > 0 && loan.data.status == 'active';
	});
	$: activeRepTtl =
		inComplete.length > 0 && $receiptStore != undefined && $receiptStore.value != undefined
			? $receiptStore.value.reduce((a, { data }) => a + data.amount, 0)
			: 0;
	$: overallActive =
		inComplete.length > 0
			? $receiptStore != undefined && $receiptStore.value != undefined
				? $receiptStore.value
						.filter((receipt) => {
							return receipt.data.balance > 0;
						})
						.reduce((a, { data }) => a + data.amount, 0)
				: 0
			: 0;
			$: list =
		$loanStore != undefined && $loanStore.value != undefined
			? $loanStore.value.sort((a, b) => b.data.loan_date_iss - a.data.loan_date_iss)
			: [];
	
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

<div class="flex justify-evenly space-x-5">
	<div class="mr-3 w-80  px-3  rounded-lg">
		<span class="text-xs underline flex justify-center">Current Lending Capital</span>
		<CtmrDtl title={'Capital'} data={MoneyFormat($businessStore.capital)} />
		<hr />
		<span class="text-xs underline flex justify-center py-3">CashIn Details Today</span>
		<div title="Active Overall Total">
			<div style="font-size: x-small;" class="italic flex justify-between text-xs">
				<span>Active loan Overall paid Total </span>
				<span>{MoneyFormat(overallActive)}</span>
			</div>
		</div>
		<div title="Closed Overall Total">
			<div style="font-size: x-small;" class="italic flex justify-between text-xs">
				<span>Closed loan Overall paid Total </span>
				<span>{MoneyFormat(activeRepTtl - overallActive)}</span>
			</div>
		</div>
		<div title="Active Loan Payment">
			<CtmrDtl title={'Active Ln paid '} data={MoneyFormat(activeRepTtl)} />
		</div>

		<CtmrDtl title={'Opening Fee(O.F)'} data={'+ ' + MoneyFormat(officeFee)} />
		<div class="flex justify-end">
			<hr class=" w-20" />
		</div>
		<CtmrDtl title={'CashIn Total '} data={MoneyFormat(cashIn)} />

		<hr />
		<span class="text-xs underline flex justify-center pt-3">Loaned out Money Today</span>

		<div title="Cash Loaned Out">
			<CtmrDtl title={'CashOut'} data={MoneyFormat(loansGiven)} />
		</div>

		<hr />
		<span class="text-xs underline flex justify-center pt-3">Overall Closed Loan Profit</span>

		<div title="Closed Loan Total relating to the table.">
			<CtmrDtl
				title={'Closed Loan Total'}
				data={MoneyFormat(
					complete.length == 0 ? 0 : complete.reduce((a, { data }) => a + data.toBePaid, 0)
				)}
			/>
		</div>
		<hr />
		<CtmrDtl
			title={'Profit Made'}
			data={MoneyFormat(
				complete.length == 0 ? 0 : complete.reduce((a, { data }) => a + data.interest, 0)
			)}
		/>

		<span class="text-xs underline flex justify-center pt-3">Today's customer Count</span>

		<div title="Cash Loaned Out">
			<CtmrDtl title={'Closed Loans'} data={complete.length} />
			<CtmrDtl title={'Active Loans paid'} data={inComplete.length} />
			<CtmrDtl
				title={'New Loans'}
				data={inComplete.filter(({ data }) => {
					return timestampToDateTime(data.loan_date_iss) == new Date().toDateString();
				}).length}
			/>
		</div>
	</div>
</div>
