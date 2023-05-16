<script>
	import Modal from '../../../../components/reuseable/modal/modal.svelte';
	import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
	import { updateCustomer } from '../../../../functions/funcs/firebase/userFuncs/fb_customers';
	import { businessStore, userAuthStore } from '../../../../functions/funcs/stores';
	import Step1 from '../../addCustomer/steps/step1.svelte';
	import Step2 from '../../addCustomer/steps/step2.svelte';
	import Step3 from '../../addCustomer/steps/step3.svelte';
	import Step4 from '../../addCustomer/steps/step4.svelte';

	export let userData;
	let formNo = 1;
	function changePage(next) {
		if (!next) {
			formNo--;
		} else {
			formNo++;
		}
		formNo = formNo <= 4 ? formNo : 1;
	}
	let name = userData.name,
		date = userData.date,
		opened = userData.opened,
		nin = userData.nin,
		status = userData.status,
		contact = userData.contact,
		completed = userData.completed,
		paid = userData.paid,
		occupation = userData.occupation,
		address = userData.address,
		location = userData.location,
		gua_avatar = userData.gua_Url,
		guarantor_name = userData.guarantor_name,
		guarantor_nin = userData.guarantor_nin,
		gua_occupation = userData.gua_occupation,
		guarantor_phoneNumber = userData.guarantor_phoneNumber,
		avatar = userData.userUrl,
		fieldAgent = userData.fieldAgent,
		customerId = userData.customerId;
</script>

<Modal
	createTitle={'Update Customer'}
	backfunc={() => {
		formNo != 1 ? changePage(false) : cliq_notify('w', 'This is the first page!');
	}}
	title={'Edit customer ✜'}
	modalTitle={'Edit Customer'}
	nextButton={formNo < 4}
	backButton={formNo != 1}
	nextFunc={() => changePage(true)}
	close={() => (formNo = 1)}
	action={() => {
		updateCustomer($businessStore.BusinessId, {
			name,
			date,
			opened,
			nin,
			status,
			contact,
			completed,
			paid,
			occupation,
			address,
			location,
			guarantor_name,
			guarantor_nin,
			gua_occupation,
			guarantor_phoneNumber,
			fieldAgent,
			customerId
		});
	}}
>
	{#if formNo == 1}
		<!-- 'Name', 'Date Opened', 'Nin', 'Status', 'Contact', 'Completed', 'Total paid' -->
		<Step1 bind:name bind:nin bind:contact bind:avatar />
	{:else if formNo == 2}
		<Step2 bind:occupation bind:address bind:location />
	{:else if formNo == 3}
		<Step3
			bind:gua_occupation
			bind:guarantor_name
			bind:guarantor_phoneNumber
			bind:guarantor_nin
			bind:gua_avatar
		/>
	{:else if formNo == 4}
		<Step4 bind:fieldAgent />
	{/if}
</Modal>
