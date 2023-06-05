<script>
	import Avatar from '../../../components/reuseable/avatar/avatar.svelte';
	import CtmrDtl from '../../../components/reuseable/customer/ctmrDtl.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import { MoneyFormat } from '../../../functions/func_essential';
	import GiveLoan from '../../loans/issueLoan/giveLoan/giveLoan.svelte';
	import ConfirmDelete from './confirmDelete.svelte';
	import EditCustomer from './update/editCustomer.svelte';
	import UpdateCustomerImage from './update/updateCustomerImage.svelte';
	export let isDetail, userData, avatar, gua_avatar;
</script>

<div class="stickerMenu py-5 px-5 flex justify-between bg-white w-full shadow-lg">
        <span class="text-blue-500 font-bold" on:click={() => (isDetail = false)} on:keypress>← Back</span> 
    <div class="">
        <EditCustomer bind:userData />
    </div>
</div>
<div class="">
    {#if userData.status == 'inactive'}
	<div class="flex justify-evenly pb-5">
			<ConfirmDelete bind:userData />
			<GiveLoan data={userData} />
        </div>
		{/if}
</div>
<div class="">
	<!-- <div /> -->
	<div class="border shadow-2xl w-auto  rounded-3xl p-3 ">
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
		<div class=" flex justify-center pb-3">
			<span class="text-sm text-gray-500 ">Customer details</span>
		</div>
        <div class=" flex justify-center">

		<div class=" space-y-5  ">
			<div class="mr-3 w-80 px-3  rounded-lg">
				<CtmrDtl title={'Nin number'} data={userData.nin} />
				<CtmrDtl title={'Work'} data={userData.occupation} />
				<CtmrDtl title={'Date_Opened'} data={userData.opened.toDate().toDateString()} />
				<CtmrDtl title={'Total_paid'} data={MoneyFormat(userData.paid)} />
			</div>
			<div class=" w-80   px-3 rounded-lg">
				<CtmrDtl title={'Phone_number'} data={userData.contact} />
				<CtmrDtl title={'Location'} data={userData.location} />
				<CtmrDtl title={'Address'} data={userData.address} />
				<CtmrDtl title={'Field_Agent'} data={userData.fieldAgent} />
			</div>
		</div>
    </div>


		<div class=" px-5 pt-10 my-10 space-y-1  ">
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
			<div class=" flex justify-center text-sm pt-2 text-slate-500 w-80 ">Guarantor Details</div>
			<div class="">
				<CtmrDtl title={'Name'} data={userData.guarantor_name} />
				<CtmrDtl title={'Nin'} data={userData.guarantor_nin} />
				<CtmrDtl title={'Contact'} data={userData.guarantor_phoneNumber} />
			</div>
		</div>
	</div>
</div>

<style>
	.stickerMenu {
		position: fixed;
		position: -webkit-sticky;
		bottom: 0px;
		left: 0px;
		display: flex;
	}
</style>
