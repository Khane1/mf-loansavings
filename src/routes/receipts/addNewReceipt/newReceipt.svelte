<script>
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import AddCstmr from '../../../components/reuseable/customer/addCstmr.svelte';
	import Input from '../../../components/reuseable/input/input.svelte';
	import LoanUserCard from '../../../components/reuseable/loan/loanUserCard.svelte';
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import LoanList from '../../loans/issueLoan/borrowerList/loanList.svelte';
	import CustLoanList from './custLoanList.svelte';
	export let addReceipt;
</script>

<div class="flex justify-between">
	<div class=" flex justify">
		<div style="cursor: pointer" on:keypress on:click={() => (addReceipt = false) } >
			<PageTitle title="← New Receipt" />
		</div>
	</div>
	<div class=" flex justify-start">
		<div class="w-30">
			<Input placeholder="Search for customer" keydown={() => {}} isText={true} type="text" />
		</div>
		<ActionBtn click={true} title={'GO'} />
	</div>
</div>
<div class="pt-5" />
<CustLoanList />
