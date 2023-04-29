<script>
	import { onMount } from 'svelte';
	import { execRights } from '../../../functions/func_essential';
	import { businessStore, screenSizeStore, userAuthStore } from '../../../functions/funcs/stores';
	// import SwitchButton from "../resuable/buttons/switchbutton/switchButton.svelte";

	$: switcher = false;
	$: user = $userAuthStore;
	onMount((e) => {
		// switcher =
		// $businessModelStore != undefined
		//     ? $businessModelStore.orderToggle
		//     : false;
	});
</script>

<div class="">
	<div class="space-y-3 {$screenSizeStore.size > 600 ? 'px-10' : ''}  py-5">
		<span class="font-bold pb-5 flex justify-center">Account Settings</span>

		<div class="flex justify-between py-4">
			<span class="font-semibold">Business Name</span>
			<span class="text-sm">{$businessStore?.name}</span>
		</div>
		<hr />
		<div>
			<div class="flex justify-between py-4">
				<span class="font-semibold">Plan</span>
				<span class="text-sm"> -- </span>
			</div>
			<hr />
			<div class="flex justify-between py-4">
				<span class="font-semibold">Expiry</span>
				<span class="text-sm"> __ </span>
			</div>
		</div>
	</div>
</div>
