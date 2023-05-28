<script>
	import Avatar from '../../../components/reuseable/avatar/avatar.svelte';
	import CtmrDtl from '../../../components/reuseable/customer/ctmrDtl.svelte';
	import ErrorMsg from '../../../components/reuseable/messages/errorMsg.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { MoneyFormat } from '../../../functions/func_essential';
	import { customersStore } from '../../../functions/funcs/stores';
	import GiveLoan from '../../loans/issueLoan/giveLoan/giveLoan.svelte';
	import ConfirmDelete from './confirmDelete.svelte';
	import EditCustomer from './update/editCustomer.svelte';
	import UpdateCustomerImage from './update/updateCustomerImage.svelte';
	export let isDetail, user,customers;
	$: customer = customers.filter(({ data }) => {
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
	<div class="flex justify-between">
		<!-- {JSON.stringify(userData)} -->
		<div style="cursor:pointer" on:click={() => (isDetail = false)} on:keypress>
			<PageTitle title={'← Customer Details'} />
		</div>
		<div class="flex justify-evenly">
			{#if userData.status == 'inactive'}
				<ConfirmDelete bind:userData />
				<GiveLoan data={userData} />
			{/if}
		</div>
	</div>
	<div class="flex justify-evenly pt-10">
		<!-- <div /> -->
		<div class="border shadow-2xl w-auto  rounded-3xl p-8  ">
			<div class="flex justify-center  pt-5 ">
				{#if userData.userUrl != undefined && userData.userUrl.length > 0}
					<Avatar src={userData.userUrl} size={2} />
				{:else}
					<UpdateCustomerImage bind:avatar bind:userData bind:isDetail isGuarantor={false} />
				{/if}
			</div>
			<div class="flex justify-center   pt-1 pb-2">
				<div class="font-semibold text-slate-600">{userData.name}</div>
			</div>
			<div class=" flex justify-start pb-3">
				<span class="text-sm text-gray-500 ">Customer details</span>
			</div>
			<div class="flex justify-evenly space-x-5 ">
				<div class="mr-3 w-80  border px-3  rounded-lg">
					<CtmrDtl title={'Nin number'} data={userData.nin} />
					<CtmrDtl title={'Work'} data={userData.occupation} />
					<CtmrDtl title={'Date_Opened'} data={userData.opened.toDate().toDateString()} />
					<CtmrDtl title={'Total_paid'} data={MoneyFormat(userData.paid)} />
				</div>
				<div class=" w-60  border  px-3 rounded-lg">
					<CtmrDtl title={'Assigned_by'} data={userData.fieldAgent} />
					<CtmrDtl title={'Address'} data={userData.address} />
					<CtmrDtl title={'Location'} data={userData.location} />
					<CtmrDtl title={'Phone_number'} data={userData.contact} />
				</div>
			</div>
			<div class="pt-10 flex justify-center">
				<EditCustomer bind:userData />
			</div>
		</div>
		<div class=" px-5 pt-10 space-y-1  border shadow-xl rounded-2xl">
			<div class="flex justify-center">
				{#if userData.gua_Url != undefined && userData.gua_Url.length > 0}
					<Avatar src={userData.gua_Url} size={0} />
				{:else}
					<UpdateCustomerImage
						bind:avatar
						bind:userData
						bind:isDetail
						isGuarantor={true}
						bind:gua_avatar
					/>
				{/if}
			</div>
			<div class="flex justify-center text-sm pt-2 text-slate-500">Guarantor</div>
			<div class="w-48">
				<CtmrDtl title={'Name'} data={userData.guarantor_name} />
				<CtmrDtl title={'Nin'} data={userData.guarantor_nin} />
				<CtmrDtl title={'Contact'} data={userData.guarantor_phoneNumber} />
			</div>
		</div>
	</div>
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
