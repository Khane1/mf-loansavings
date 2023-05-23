<script>
	import { dataset_dev, onMount } from 'svelte/internal';
	import AddCstmr from '../../../../components/reuseable/customer/addCstmr.svelte';
	import Input from '../../../../components/reuseable/input/input.svelte';
	import GlTitle from '../../../../components/reuseable/loan/giveLoan/gl_title.svelte';
	import Modal from '../../../../components/reuseable/modal/modal.svelte';
	import { createLoan } from '../../../../functions/funcs/firebase/userFuncs/fb_loans';
	import { businessStore } from '../../../../functions/funcs/stores';
	import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
	import ActionBtn from '../../../../components/reuseable/buttons/actionBtn.svelte';
	import { uuidv4 } from '@firebase/util';
	import PageTitle from '../../../../components/reuseable/title/pageTitle.svelte';
	import {
		convertCustomDate4InputMin,
		convertDate4InputMin,
		dateDiffInDays,
		getDateToday,
		MoneyFormat
	} from '../../../../functions/func_essential';
	$: formNo = 1;
	function changePage(next) {
		if (!next) {
			formNo--;
		} else {
			formNo++;
		}
		formNo = formNo <= 5 ? formNo : 1;
	}
	let amount = 0;
	let percentage = 0;
	let collateral = '';
	let openingFee = 0;
	let isNewLoan; //false; old loan
	$: loan_due = new Date();
	$: loan_start = new Date();
	$: loan_date_iss = isNewLoan ? new Date() : new Date(loan_start);
	$: loan_term = isNewLoan
		? dateDiffInDays(loan_date_iss, new Date(loan_due))
		: dateDiffInDays(new Date(loan_start), new Date(loan_due));
	let attributes = {
		min: convertDate4InputMin()
	};

	$: interest = (amount * percentage) / 100;
	$: toBePaid = parseInt(interest) + parseInt(amount);
	$: capital = $businessStore.capital;
	export let data;
	export let c_id;
	$: isComplete = false;
	$: lastpaid = '';
	$: balance = 0;
	let loanId = uuidv4();
</script>

<Modal
	createTitle={'Save loan data'}
	backfunc={() => {
		formNo != 1 ? changePage(false) : cliq_notify('w', 'This is the first page!');
	}}
	title={'Give Loan ✜'}
	modalTitle={'Give Loan '}
	nextButton={formNo < 5}
	backButton={formNo != 1}
	nextFunc={() => {
		formNo != 3 ? changePage(true) : cliq_notify('w', 'Please select an option!');
	}}
	close={() => (formNo = 1)}
	action={() => {
		if (data.status == 'active') {
			cliq_notify('d', 'This customer has an active loan.');
		} else if ((capital >= amount && amount > 0) || !isNewLoan) {
			if (balance <= toBePaid) {
					createLoan(
						$businessStore,
						c_id,
						isNewLoan,
						{
							borrower: data.name,
							customerId: c_id,
							Loan: amount,
							toBePaid,
							lastpaid: isNewLoan ? '' : isComplete ? new Date(loan_due) : new Date(lastpaid),
							balance: isNewLoan ? toBePaid : isComplete ? 0 : balance,
							collateral,
							interest,
							loan_term,
							Opening_Fee: openingFee,
							type: 'original',
							interest,
							loan_date_iss,
							loan_due: new Date(loan_due),
							date: new Date(),
							userUrl: data.userUrl ?? '',
							status: isComplete ? 'complete' : 'active',
							newLoan: isNewLoan
						},
						loanId
					);
			} else {
				cliq_notify('d', 'Balance should be less than Loan');
			}
		} else {
			cliq_notify(
				'd',
				"You can't issue" +
					(capital < amount ? ' a loan more than capital available.' : ' a loan amount of 0.')
			);
		}
	}}
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
			<GlTitle title={'Are you creating an old or new Loan?'} />

			<div class="flex justify-center">
				<ActionBtn
					title="Old Loan "
					click={() => {
						isNewLoan = false;
						changePage(true);
					}}
				/>
				<ActionBtn
					title="New Loan "
					click={() => {
						isComplete = false;
						isNewLoan = true;
						changePage(true);
					}}
				/>
			</div>
			<div class=" w-72 flex justify-center">
				<span class="text-xs ">
					Old loans can have an older date of Issue, while new loans can only have today as the date
					of Issue.
				</span>
			</div>
			<div class=" w-72 flex justify-center">
				<span class="text-xs text-red-500">Old loans do not affect your capital.</span>
			</div>
		{:else if formNo == 4}
			<div>
				<GlTitle title={'Please enter your loan opening fee.'} />
				<div>
					<AddCstmr type="number" label="Opening fee" isText={false} bind:value={openingFee} />
				</div>
			</div>
			{#if isNewLoan == true}
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
				<div>
					<GlTitle title={'When did you issue this Loan?'} />
					<div class="">
						<!-- {new Date().toDateString()} -->
						<input type="date" bind:value={loan_start} />
						<!-- <AddCstmr type="number" label="Number of days" isText={false} bind:value={loan_term} /> -->
					</div>
				</div>
				<div>
					<GlTitle title={'When will this loan expire?'} />
					<div class="">
						<!-- {new Date().toDateString()} -->
						<input type="date" bind:value={loan_due} min={convertCustomDate4InputMin(loan_start)} />
						<!-- <AddCstmr type="number" label="Number of days" isText={false} bind:value={loan_term} /> -->
					</div>
				</div>
				<div>
					<GlTitle title={'Is the loan complete?'} />
					<div class=" font-semibold text-blue-800">
						{isComplete ? 'Yes it is!' : "No it's not!"}
					</div>
					<div class="flex space-x-3 py-3 ">
						<div class="border w-32 flex justify-center ">
							<div class="px-2">No</div>
							<input type="radio" class="px-2" value={false} bind:group={isComplete} />
						</div>
						<div class="border w-32 flex justify-center ">
							<div class="px-2">Yes</div>
							<input type="radio" class="px-2" value={true} bind:group={isComplete} />
						</div>
					</div>
				</div>
				{#if !isComplete}
					<div>
						<GlTitle title={'What is the balance on the Loan?'} />
						<AddCstmr type="number" label="Balance" isText={false} bind:value={balance} />
					</div>
					<div>
						<GlTitle title={'When did the customer last make a payment?'} />
						<input type="date" bind:value={lastpaid} max={convertCustomDate4InputMin(loan_start)} />
					</div>
				{/if}
			{/if}
		{:else}
			<div class="space-y-3">
				<div>
					<GlTitle title={'Customer Name'} />
					{data.name}
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
