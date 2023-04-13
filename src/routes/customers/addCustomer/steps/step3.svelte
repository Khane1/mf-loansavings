<script>
	import Avatar from '../../../../components/reuseable/avatar/avatar.svelte';

	import AddCstmr from '../../../../components/reuseable/customer/addCstmr.svelte';
	export let gua_occupation, guarantor_name, guarantor_phoneNumber, guarantor_nin,gua_avatar;
</script>

<div class="mb-10">
	<div class="flex justify-center ">
		<Avatar src="" size="30" upload={true} bind:avatar={gua_avatar}/>
	</div>
	<div class="flex justify-center text-sm text-gray-600 pt-2">
		<span>Guarantor image</span>
	</div>
</div>
<AddCstmr type="Text" label="Guarantor Name" isText={true} bind:value={guarantor_name} />
<AddCstmr type="Text" label="National ID" isText={true} bind:value={guarantor_nin} />
<AddCstmr type="Text" label="Occupation" isText={true} bind:value={gua_occupation} />
<AddCstmr type="number" label="Phone Number" isText={false} bind:value={guarantor_phoneNumber} />
