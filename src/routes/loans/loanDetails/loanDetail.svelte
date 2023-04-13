<script>
	import LnDtTtle from '../../../components/reuseable/loan/lnDt_Ttle.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import Detaildata from '../../../components/reuseable/loan/detaildata.svelte';
	import Avatar from '../../../components/reuseable/avatar/avatar.svelte';
	import {
		calculateInterest,
		dateDiffInDays,
		MoneyFormat,
		timestampToDateTime
	} from '../../../functions/func_essential';
	export let isDetail, loanData;
</script>

<div class="flex justify-between">
	<div on:click={() => (isDetail = false)} on:keypress style="cursor:pointer">
		<PageTitle title={'← Loan Details'} />
	</div>
	<div class="pr-10">
		<PageTitle title={loanData.borrower} />
	</div>
</div>

<div class="pt-10 ">
	<div class="flex justify-evenly border border-black-50 py-10 rounded-xl mx-10 bg-slate-50">
		<div class="pt-1 justify-center space-y-3">
			<div class="flex justify-center">
				<Avatar
					size={1}
					src={loanData.userUrl ??
						'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80'}
				/>
			</div>
			<!-- <div class="text-sm">{loanData.borrower} Kawooya</div> -->
		</div>
		<div class="space-y-5 justify-center ">
			<LnDtTtle title={'Loan Issued (current)'} />
			<LnDtTtle
				hasUnit={true}
				isSub={true}
				unit={'UGX'}
				title={MoneyFormat(loanData.Loan, false)}
			/>
		</div>
		<div class="space-y-5 justify-center">
			<LnDtTtle title={'To be paid(current)'} />
			<LnDtTtle
				hasUnit={true}
				isSub={true}
				unit={'UGX'}
				title={MoneyFormat(loanData.toBePaid, false)}
			/>
		</div>
		<div class="space-y-5 justify-center">
			<LnDtTtle title={'Balance(current)'} />
			<LnDtTtle
				hasUnit={true}
				isSub={true}
				unit={'UGX'}
				title={MoneyFormat(loanData.balance, false)}
			/>
		</div>
		<div class="space-y-5 justify-center">
			<LnDtTtle title={'Last paid'} />
			<LnDtTtle
				isSub={true}
				title={loanData.lastpaid.length == 0
					? "Hasn't yet paid"
					: timestampToDateTime(loanData.lastpaid)}
			/>
		</div>
	</div>
</div>

<div class="flex justify-evenly">
	<div class="pt-20">
		<div class="text-slate-400 text-xs  font-light">Details</div>

		<Detaildata title="Interest" data={calculateInterest(loanData.interest, loanData.Loan) + '%'} />
		<Detaildata title="Opening_Fee" data={MoneyFormat(loanData.Opening_Fee)} />
		<Detaildata title="Type" data={loanData.type} />
		<Detaildata title="Profit" data={MoneyFormat(loanData.interest)} />
	</div>
	<div class="pt-20">
		<div />
		<Detaildata title="Loan_term" data={loanData.loan_term + ' days'} />
		<Detaildata title="Date_Issued" data={timestampToDateTime(loanData.loan_date_iss)} />
		<Detaildata
			title="Time_left"
			data={JSON.stringify(dateDiffInDays(new Date(), loanData.loan_due.toDate())) + ' days'}
		/>
		<Detaildata title="Security" data={loanData.collateral} />
		<div class="mt-6 space-x-20 flex">
			<!-- <div class=" mt-2 text-sm">Profit</div> -->
			<ActionBtn title={'See Transaction History ❒'} />
		</div>
	</div>
</div>

<style>
</style>
