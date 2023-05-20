<script>
	import Modal from "../../../components/reuseable/modal/modal.svelte";
	import { deleteLoan } from "../../../functions/funcs/firebase/userFuncs/fb_loans";
	import { businessStore } from "../../../functions/funcs/stores";
    let formNo=1;
    export let loanData;
</script>
<Modal
	createTitle={'Delete'}
	title={'Delete loan data'}
	modalTitle={'Delete Loan '}
	nextButton={formNo < 1}
	nextFunc={() => {}}
	close={() => (formNo = 1)}
	action={() => {
		deleteLoan($businessStore, loanData);
	}}
>
	<div>
		Are you sure you want to delete
		<p class="font-bold">
			{loanData.borrower}'s data.
		</p>
	</div>
</Modal>
