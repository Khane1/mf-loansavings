<script>
	import { dataset_dev } from 'svelte/internal';
	import AddCstmr from '../../../../components/reuseable/customer/addCstmr.svelte';
	import Input from '../../../../components/reuseable/input/input.svelte';
	import GlTitle from '../../../../components/reuseable/loan/giveLoan/gl_title.svelte';
	import Modal from '../../../../components/reuseable/modal/modal.svelte';
	import {
		convertDate4InputMin,
		dateDiffInDays,
		getDateToday,
		MoneyFormat
	} from '../../../../functions/func_essential';
	import { createLoan } from '../../../../functions/funcs/firebase/userFuncs/fb_loans';
	import { businessStore } from '../../../../functions/funcs/stores';
	$: formNo = 1;
	function changePage() {
		formNo++;
		formNo = formNo <= 4 ? formNo : 1;
	}
	let amount = 0;
	let percentage = 0;
	let collateral = '';
	let openingFee = 0;
	let loan_due = '';
	let loan_date_iss = new Date();
	$: loan_term = dateDiffInDays(loan_date_iss, new Date(loan_due));
	let attributes = {
		min: convertDate4InputMin()
	};
	$: interest = (amount * percentage) / 100;
	$: toBePaid = parseInt(interest) + parseInt(amount);
	export let data;
	export let c_id;
</script>

<Modal
	createTitle={'Save loan data'}
	title={'Give Loan ✜'}
	modalTitle={'Give Loan ' + formNo}
	nextButton={formNo < 4}
	nextFunc={() => changePage()}
	close={() => (formNo = 1)}
	action={() =>
		createLoan($businessStore.BusinessId, c_id, {
			borrower: data.name,
			customerId: c_id,
			Loan: amount,
			collateral,
			interest,
			toBePaid,
			loan_term,
			Opening_Fee: openingFee,
			type: 'original',
			interest,
			loan_date_iss,
			loan_due: new Date(loan_due),
			balance: toBePaid,
			date: new Date(),
			lastpaid: '',
			userUrl: data.userUrl ?? ''
		})}
>
	<div class="space-y-5">
		{#if formNo == 1}
			<div class="">
				<GlTitle title={'Customer Name'} />
				{data.name}
			</div>

			<div>
				<GlTitle title={'How much is the customer borrowing?'} />
				<AddCstmr type="number" label="Amount" isText={false} bind:value={amount} />
			</div>

			<div>
				<GlTitle title={'What Security is being collected?'} />
				<AddCstmr type="text" label="Security" isText={true} bind:value={collateral} />
			</div>
		{:else if formNo == 2}
			<div class=" rounded-lg  ">
				<GlTitle title={"What's the interest rate on the loan?"} />

				<label for="">Interest % </label>
				<select
					id="cars"
					name="cars"
					class="text-black border"
					bind:value={percentage}
					on:select={() => toBePaid()}
				>
					<option value="10">10%</option>
					<option value="20">20%</option>
					<option value="30">30%</option>
					<option value="40">40%</option>
					<option value="custom">custom</option>
				</select>
				<div class="">
					{MoneyFormat(interest)}
				</div>
			</div>

			<div class="pt-3  font-semibold">
				<GlTitle title={'This is how much the customer will pay.'} />
				<div class="font-normal ">
					{MoneyFormat(toBePaid)}
					<!-- Loan+= Loan * Interest -->
				</div>
			</div>
		{:else if formNo == 3}
			<div>
				<GlTitle title={'Please enter your loan opening fee.'} />
				<div>
					<AddCstmr type="number" label="Opening fee" isText={false} bind:value={openingFee} />
				</div>
			</div>
			<div>
				<GlTitle title={'Date today'} />
				<div class="">
					{new Date().toDateString()}
				</div>
			</div>
			<div>
				<GlTitle title={'Loan Term'} />
				<div class="">
					<!-- {new Date().toDateString()} -->
					<input type="date" bind:value={loan_due} min={attributes.min} />
					<!-- <AddCstmr type="number" label="Number of days" isText={false} bind:value={loan_term} /> -->
				</div>
			</div>
		{:else}
			<div class="space-y-3">
				<div>
					<GlTitle title={'Customer Name'} />
					James L
				</div>
				<div>
					<GlTitle title={'Loan Issued'} />
					{MoneyFormat(amount)}
				</div>
				<div>
					<GlTitle title={'Collateral'} />
					<label for="">{collateral} </label>
				</div>
				<div>
					<GlTitle title={'Interest'} />
					<label for="">{MoneyFormat(interest)} </label>
				</div>
				<div>
					<GlTitle title={'Repayment total'} />
					{MoneyFormat(toBePaid)}
				</div>
				<div>
					<GlTitle title={'Loan opening fee.'} />
					{MoneyFormat(openingFee)}
				</div>
				<div>
					<GlTitle title={'Loan Term'} />
					<div class="">
						{loan_term} days
					</div>
				</div>
			</div>
		{/if}
	</div>
</Modal>
