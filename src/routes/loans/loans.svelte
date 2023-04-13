<script>
	import {} from 'os';
	import IssueLoan from './issueLoan/issueLoan.svelte';
	import LoanDetail from './loanDetails/loanDetail.svelte';
	import LoanHome from './home/loan_home.svelte';
	let isDetail = false;
	let newLoan = false;
	let loanData;
	
</script>

{#if isDetail}
	<LoanDetail bind:isDetail bind:loanData />
{:else if newLoan}
	<IssueLoan bind:newLoan />
{:else}
	<LoanHome bind:newLoan bind:isDetail bind:loanData />
{/if}
