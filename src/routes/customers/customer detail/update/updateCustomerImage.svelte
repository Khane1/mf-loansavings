<script>
	import Avatar from '../../../../components/reuseable/avatar/avatar.svelte';
	import { cliq_notify } from '../../../../components/reuseable/notificationsToast/onNotify';
	import { updatecustomerImage } from '../../../../functions/funcs/firebase/userFuncs/fb_customers';
	import { businessStore } from '../../../../functions/funcs/stores';

	export let avatar,
		gua_avatar,
		userData,
		isDetail,
		isGuarantor = false;
</script>

{#if isGuarantor == false}
	<div>
		<div class="flex justify-center">
			<Avatar upload={true} bind:avatar src={userData.userUrl} size={2} />
		</div>
		{#if avatar != undefined}
			<div class="pt-3">
				<span
					class="border rounded text-white py-1 bg-green-500  text-xs px-4"
					on:click={() => {
						updatecustomerImage(
							$businessStore.BusinessId,
							{ avatar, name: userData.name, businessName: $businessStore.name },
							{},
							userData
						);
						isDetail = false;
						cliq_notify('i', 'Please wait as we upload this image.');
					}}
					on:keypress>Save Image</span
				>
			</div>
		{/if}
	</div>
{:else}
	<div>
		<div class="flex justify-center">
			<Avatar upload={true} bind:avatar={gua_avatar} src={userData.gua_Url} size={0} />
		</div>
		{#if gua_avatar != undefined && gua_avatar != ''}
			<div class="pt-3">
				<span
					style="font-size: x-small;"
					class="border rounded text-white py-1 bg-green-500 px-4"
					on:click={() => {
						updatecustomerImage(
							$businessStore.BusinessId,
							{},
							{
								avatar: gua_avatar,
								name: userData.guarantor_name,
								businessName: $businessStore.name
							},
							userData
						);
						isDetail = false;
						cliq_notify('i', 'Please wait as we upload this image.');
					}}
					on:keypress>Save Image</span
				>
			</div>
		{/if}
	</div>
{/if}
