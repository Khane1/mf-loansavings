<script>
	import ErrorMsg from '../../../components/reuseable/messages/errorMsg.svelte';
	import { screenSizeStore } from '../../../functions/funcs/stores';
	import LgCustomerDetails from './lgCustomerDetails.svelte';
	import SmCustomerDetail from './smCustomerDetail.svelte';
	export let isDetail, user, customers;
	$: customer = customers.filter(({ data }) => {
		//this is for the live updates on a customer
		return data.customerId == user.customerId;
	});
	$: userData =
		user != undefined &&
		user.customerId != undefined &&
		customer != undefined &&
		customer.length > 0
			? customer[0].data
			: undefined;
	$: avatar = undefined;

	$: gua_avatar = userData?.gua_avatar;
</script>

{#if userData != undefined}
	{#if $screenSizeStore.size < 768}
	<SmCustomerDetail bind:isDetail bind:userData bind:avatar bind:gua_avatar />
	{:else}
	<LgCustomerDetails bind:isDetail bind:userData bind:avatar bind:gua_avatar />
	{/if}
{:else}
	<ErrorMsg title={'No data found!'} subdata={'Sorry the data no longer exists.'} />
	<div class="flex justify-center ">
		<span
			style="cursor:pointer"
			class=" border px-3 py-1 mt-10 text-center text-sm hover:shadow-md hover:bg-slate-700 hover:text-slate-50 shadow-sm rounded-lg"
			on:click={() => (isDetail = false)}
			on:keypress
		>
			Back to customer table
		</span>
	</div>
{/if}
