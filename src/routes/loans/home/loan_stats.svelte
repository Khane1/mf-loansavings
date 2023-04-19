<script>
	import CtmrDtl from '../../../components/reuseable/customer/ctmrDtl.svelte';
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import { MoneyFormat, calculateInterest } from '../../../functions/func_essential';

	export let inComplete, complete, cashIn, loansGiven;
	let formNo = 1;
	$: activeRepTtl = inComplete.reduce((a, { data }) => a + (data.toBePaid - data.balance), 0);
	let interest = inComplete.reduce(
		(a, { data }) => a + calculateInterest(data.interest, data.Loan),
		0
	);
</script>

<Modal
	createTitle={'Close'}
	title={'Summary report'}
	modalTitle={'Basic Report'}
	nextButton={formNo < 1}
	nextFunc={() => {}}
	close={() => (formNo = 1)}
	action={() => {}}
>
	<div class="flex justify-evenly space-x-5 ">
		<div class="mr-3 w-80  px-3  rounded-lg">
			<CtmrDtl title={'CashOut'} data={MoneyFormat(loansGiven)} />
			<hr />
			<CtmrDtl
				title={'Active repayment total'}
				data={MoneyFormat(inComplete.length == 0 ? 0 : activeRepTtl)}
			/>
			<CtmrDtl
				title={'Closed Loan Total'}
				data={MoneyFormat(
					complete.length == 0 ? 0 : complete.reduce((a, { data }) => a + data.toBePaid, 0)
				)}
			/>
			<CtmrDtl title={'CashIn'} data={MoneyFormat(cashIn)} />
			<hr />
			<CtmrDtl
				title={'Profit Made'}
				data={MoneyFormat(
					complete.length == 0 ? 0 : complete.reduce((a, { data }) => a + data.interest, 0)
				)}
			/>
		</div>
	</div>
</Modal>
