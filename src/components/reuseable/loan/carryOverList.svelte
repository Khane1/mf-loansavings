<script>
	import {
		calculateInterest,
		dateDiffInDays,
		MoneyFormat,
		timestampToDateTime
	} from '../../../functions/func_essential';
	import { checkLoanStatus } from '../../../functions/funcs/firebase/userFuncs/fb_loans';
	import { createReceipt } from '../../../functions/funcs/firebase/userFuncs/fb_receipts';
	import { businessStore } from '../../../functions/funcs/stores';
	import Modal from '../modal/modal.svelte';

	export let expiredLoans;
	let datepaid = new Date().toDateString();
	var today = new Date();
	var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

	function stringLength(name) {
		return name?.length > 15 ? name?.substring(0, 10) + '..' : name;
	}
</script>

{#each expiredLoans as loan, i}
	<div class="mt-2" />
	<tr class="">
		<td class="px-6 py-2  text-sm font-medium text-gray-900 whitespace-nowrap">
			{stringLength(loan.data.borrower)}
		</td>
		<td class="px-6 py-2  text-sm font-medium text-gray-900 whitespace-nowrap">
			{MoneyFormat(loan.data.toBePaid)}
		</td>
		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			{MoneyFormat(loan.data.balance)}
		</td>
		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			{dateDiffInDays(new Date(), loan.data.loan_due.toDate()) < 0
				? 'Expired'
				: 'Days left ' + dateDiffInDays(new Date(), loan.data.loan_due.toDate())}
			<!-- {MoneyFormat(item.total)} -->
		</td>
		<td class="text-xs text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			<Modal
				modalTitle={'Are you sure?'}
				title={'CarryOver'}
				close={() => {}}
				createTitle={'CarryOver'}
				action={() => {
					checkLoanStatus($businessStore.BusinessId, loan.data);
				}}
			>
				<div class="text-lg flex justify-center text-center">
					Do you want to Carry
					<br />
					{loan.data.borrower}'s Loan Over?
				</div>
			</Modal>
		</td>
		<td class="text-xs text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			<Modal
				modalTitle={'Are you sure?'}
				title={'Complete'}
				close={() => {}}
				createTitle={'Yes it is'}
				action={() => {
					createReceipt(
						$businessStore,
						{
							borrowerId: loan.data.customerId,
							borrower: loan.data.borrower,
							amount: loan.data.balance,
							balance: 0,
							days_left: JSON.stringify(0),
							last_paid: new Date(datepaid + ' ' + time)
						},
						0,
						loan.data
					);
				}}
			>
				<div class="text-lg flex justify-center text-center">
					Is
					{loan.data.borrower}'s
					Loan complete?
				</div>
				<div class="text-center mt-2">
					A receipt will be added and
					<br />
					we will close this loan.
				</div>
			</Modal>
		</td>
	</tr>
{/each}
