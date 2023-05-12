<script>
	import { onMount } from 'svelte';
	import Avatar from '../../../components/reuseable/avatar/avatar.svelte';
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import AddCstmr from '../../../components/reuseable/customer/addCstmr.svelte';
	import Input from '../../../components/reuseable/input/input.svelte';
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import { createCustomer } from '../../../functions/funcs/firebase/userFuncs/fb_customers';
	import { businessStore, userAuthStore } from '../../../functions/funcs/stores';
	import Step1 from './steps/step1.svelte';
	import Step2 from './steps/step2.svelte';
	import Step3 from './steps/step3.svelte';
	import Step4 from './steps/step4.svelte';
	import { cliq_notify } from '../../../components/reuseable/notificationsToast/onNotify';
	let formNo = 1;
	let name,
		date = new Date(),
		opened = new Date(),
		nin,
		status = 'inactive',
		contact,
		completed = 0,
		paid = 0,
		occupation,
		address,
		location,
		gua_avatar,
		guarantor_name,
		guarantor_nin,
		gua_occupation,
		guarantor_phoneNumber,
		avatar,
		fieldAgent;
	function changePage(next) {
		if (!next) {
			formNo--;
		} else {
			formNo++;
		}
		formNo = formNo <= 4 ? formNo : 1;
	}

	onMount((e) => {
		formNo = 1;
	});
</script>

<Modal
	createTitle={'Save Customer'}
	backfunc={() => {
		formNo != 1 ? changePage(false) : cliq_notify('w', 'This is the first page!');
	}}
	title={'Add Customer ✜'}
	modalTitle={formNo < 3 ? 'Customer  info ' + formNo : 'Guarantor info ' + formNo}
	nextButton={formNo < 4}
	backButton={formNo != 1}
	nextFunc={() => changePage(true)}
	close={() => (formNo = 1)}
	action={() => {
		createCustomer(
			$userAuthStore.businessId,
			{ avatar, name: name, businessName: $businessStore.name },
			{ avatar: gua_avatar, name: guarantor_name, businessName: $businessStore.name },
			{
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
				fieldAgent
			},$businessStore
		);
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
