<script>
	import {} from 'os';
	import ActionBtn from '../../components/reuseable/buttons/actionBtn.svelte';
	import BtnSidebar from '../../components/reuseable/buttons/btn_sidebar.svelte';
	import Input from '../../components/reuseable/input/input.svelte';
	import Table from '../../components/reuseable/tables/table.svelte';
	import HeaderSidebar from '../../components/reuseable/title/headerSidebar.svelte';
	import PageTitle from '../../components/reuseable/title/pageTitle.svelte';
	import LoanDetail from '../loans/loanDetails/loanDetail.svelte';
	import NewReceipt from './addNewReceipt/newReceipt.svelte';
	import ReceiptHome from './home/receiptHome.svelte';
	let addReceipt = false;
	let loanDetail = false;
	let loanData;
	let page = 'receipts';
</script>


	{#if addReceipt}
		<NewReceipt bind:addReceipt />
	{:else if loanDetail}
		<LoanDetail bind:loanData bind:isDetail={loanDetail} />
	{:else}
		<ReceiptHome bind:loanDetail bind:loanData bind:addReceipt />
	{/if}

