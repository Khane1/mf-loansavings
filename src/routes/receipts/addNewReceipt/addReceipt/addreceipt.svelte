<script>
	import { stringify } from 'postcss';
	import AddCstmr from '../../../../components/reuseable/customer/addCstmr.svelte';
	import Input from '../../../../components/reuseable/input/input.svelte';
	import GlTitle from '../../../../components/reuseable/loan/giveLoan/gl_title.svelte';
	import Modal from '../../../../components/reuseable/modal/modal.svelte';
	import { dateDiffInDays, getDateToday, MoneyFormat } from '../../../../functions/func_essential';
	import { createReceipt } from '../../../../functions/funcs/firebase/userFuncs/fb_receipts';
	import { businessStore, customersStore } from '../../../../functions/funcs/stores';
	import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
	$: formNo = 1;
	function changePage() {
		formNo++;
		formNo = formNo <= 4 ? formNo : 1;
	}
	let amount = 0;
	let percentage = 0;
	let collateral = '';
	let openingFee = 0;
	$: interest = (amount * percentage) / 100;
	$: toBePaid = parseInt(interest) + parseInt(amount);
	$: newBalance = loanData.balance - amount;
	export let loanData,customerId;
	$: userData = $customersStore.value.filter((e) =>
		e.customer_id.toLowerCase().includes(loanData.customerId)
	);
</script>

<!-- Borrower	Amount	Agent	Balance	Days left	Last paid -->

<Modal
	createTitle={'Save receipt'}
	title={'Add receipt ✜'}
	modalTitle={'New Receipt pg.' + formNo}
	nextButton={formNo < 2}
	nextFunc={() => changePage()}
	close={() => (formNo = 1)}
	action={() => {
		if (newBalance >= 0) {
			createReceipt(
				$businessStore.BusinessId,
				{
					borrowerId: customerId,
					borrower: loanData.borrower,
					amount,
					balance: newBalance,
					days_left: JSON.stringify(dateDiffInDays(new Date(), loanData.loan_due.toDate())),
					last_paid: new Date()
				},
				newBalance,
				loanData,
				userData
			);
		}else{
			cliq_notify('d','You can\'t deposit more than the required amount. ')
		}
	}}
>
	<div class="space-y-5">
		{#if formNo == 1}
			<div class="">
				<GlTitle title={'Customer Name'} />
				{loanData.borrower}
			</div>

			<div>
				<GlTitle title={'How much is the customer paying?'} />
				<span class="text-xs text-red-600">
					{newBalance<0?"You can\'t deposit more than the required amount":''}
				</span>	 
				<AddCstmr type="number" label="Balance {MoneyFormat(loanData.balance)}" isText={false} bind:value={amount} />
			</div>
		{:else}
			<div class="space-y-3">
				<div>
					<GlTitle title={'Customer Name'} />
					{loanData.borrower}
				</div>
				<div>
					<GlTitle title={'Amount Paid'} />
					{MoneyFormat(amount)}
				</div>

				<div>
					<GlTitle title={'Payment date'} />
					<div class="">
						{new Date().toDateString()}
					</div>
				</div>
			</div>
		{/if}
	</div>
</Modal>
