<script>
	import Avatar from '../../../components/reuseable/avatar/avatar.svelte';
	import AvatarName from '../../../components/reuseable/avatar/avatarName.svelte';
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import CtmrDtl from '../../../components/reuseable/customer/ctmrDtl.svelte';
	import { customersStore } from '../../../functions/funcs/stores';
	export let data, isDetail;
	let count;
	$: sortCount =
		$customersStore != undefined && $customersStore.value != undefined
			? $customersStore.value.filter((loan) =>
					loan.data.fieldAgent?.toLowerCase().includes(data.name.toLowerCase())
			  )
			: [];
	console.log(data.name);
</script>

<div class="flex justify-center pt-7">
	<div class="border shadow-2xl w-80  rounded-3xl p-8  ">
		<div class="flex justify-center ">
			<Avatar
				src={data.memberUrl ??
					'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Uganda_-_Ruwenzori_Mountain_Lady.jpg/330px-Uganda_-_Ruwenzori_Mountain_Lady.jpg'}
				size={2}
			/>
		</div>
		<div class="flex justify-center pt-1">
			<AvatarName name={data.name} />
		</div>
		<div class="pt-5">
			<span class="text-sm text-gray-500 ">Personal details</span>
		</div>
		<CtmrDtl title={'Role'} data={data.roleVal} />
		<CtmrDtl title={'Nin number'} data={data.nin} />
		<CtmrDtl title={'Phone Number'} data={data.contact} />
		<CtmrDtl title={'Customers Onboarded'} data={JSON.stringify(sortCount.length)} />

		<div class="flex justify-center">
			<ActionBtn
				title={'Go back'}
				danger={false}
				click={() => {
					isDetail = false;
				}}
			/>
		</div>
	</div>
</div>
