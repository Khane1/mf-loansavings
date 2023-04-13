<script>
	import Avatar from '../../../components/reuseable/avatar/avatar.svelte';
	import AvatarName from '../../../components/reuseable/avatar/avatarName.svelte';
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import AddCstmr from '../../../components/reuseable/customer/addCstmr.svelte';
	import CtmrDtl from '../../../components/reuseable/customer/ctmrDtl.svelte';
	import PageTitle from '../../../components/reuseable/title/pageTitle.svelte';
	import GiveLoan from '../../loans/issueLoan/giveLoan/giveLoan.svelte';
	export let isDetail, userData;
</script>

<div class="flex justify-between">
	<!-- {JSON.stringify(userData)} -->
	<div style="cursor:pointer" on:click={() => (isDetail = false)} on:keypress>
		<PageTitle title={'← Customer Details'} />
	</div>
	<div>
		<GiveLoan data={userData} />
	</div>
</div>

<div class="flex justify-evenly pt-10">
	<!-- <div /> -->
	<div class="border shadow-2xl w-auto  rounded-3xl p-8  ">
		<div class="flex justify-center  pt-5 ">
			<Avatar
				src={userData.userUrl ??
					'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Uganda_-_Ruwenzori_Mountain_Lady.jpg/330px-Uganda_-_Ruwenzori_Mountain_Lady.jpg'}
				size={2}
			/>
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
				<CtmrDtl title={'Total_paid'} data={userData.paid} />
			</div>
			<div class=" w-60  border  px-3 rounded-lg">
				<CtmrDtl title={'Assigned_by'} data={userData.fieldAgent} />
				<CtmrDtl title={'Address'} data={userData.address} />
				<CtmrDtl title={'Location'} data={userData.location} />
				<CtmrDtl title={'Phone_number'} data={userData.contact} />
			</div>
		</div>
	</div>
	<div class=" px-5 pt-10 space-y-1  border shadow-xl rounded-2xl">
		<div class="flex justify-center">
			<Avatar
				src={userData.gua_Url ??
					'https://img.freepik.com/free-photo/worldface-ugandan-man-white-background_53876-30388.jpg'}
				size={0}
			/>
		</div>
		<div class="flex justify-center text-sm pt-2 text-slate-500">Guarantor</div>
		<div class="w-48">
			<CtmrDtl title={'Name'} data={userData.guarantor_name} />
			<CtmrDtl title={'Nin'} data={userData.guarantor_nin} />
			<CtmrDtl title={'Contact'} data={userData.guarantor_phoneNumber} />
		</div>
	</div>
</div>
