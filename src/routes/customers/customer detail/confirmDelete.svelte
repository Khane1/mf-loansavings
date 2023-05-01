<script>
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import { deleteCustomer } from '../../../functions/funcs/firebase/userFuncs/fb_customers';
	import { businessStore } from '../../../functions/funcs/stores';
	let formNo = 1;
	export let userData;
</script>

<Modal
	createTitle={'Delete'}
	title={'Delete user data'}
	modalTitle={'Delete Customer '}
	nextButton={formNo < 1}
	nextFunc={() => {}}
	close={() => (formNo = 1)}
	action={() => {
		deleteCustomer($businessStore.BusinessId, userData.customerId);
	}}
>
	<div>
		Are you sure you want to delete
		<p class="font-bold">
			{userData.name}'s data.
		</p>
	</div>
</Modal>
