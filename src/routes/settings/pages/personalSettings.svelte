<script>
	import { onMount } from 'svelte';
	import Avatar from '../../../components/reuseable/avatar/avatar.svelte';
	import { execRights, timestampToDateTime } from '../../../functions/func_essential';
	import { businessStore, screenSizeStore, userAuthStore } from '../../../functions/funcs/stores';
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import { saveProfileImage } from '../../../functions/funcs/firebase/userFuncs/fb_user';
	// import SwitchButton from "../resuable/buttons/switchbutton/switchButton.svelte";

	$: switcher = false;
	$: user = $userAuthStore;
	onMount((e) => {
		// switcher =
		// $businessModelStore != undefined
		//     ? $businessModelStore.orderToggle
		//     : false;
	});
	let avatar;
</script>

<div class="">
	<div class="space-y-4 {$screenSizeStore.size > 600 ? 'px-10' : ''}  py-5">
		<span class="font-bold pb-5 flex justify-center">Account Settings</span>
		<div>
			<div class="flex justify-center">
				<Avatar size="40" src={user.profile??''} bind:avatar/>
			</div>
			<div />
			<div class="flex justify-between py-4">
				<span class="font-semibold">Name</span>
				<span class="text-sm">
					{user.name}
				</span>
			</div>
			<hr />
		</div>
		<div>
			<div class="flex justify-between pb-4">
				<span class="font-semibold">Email</span>
				<span class="text-sm">
					{user.email}
				</span>
			</div>
			<hr />
		</div>

		<div />
		<div>
			<div class="flex justify-between py-4">
				<span class="font-semibold">last loggedIn</span>
				<span class="text-sm"> {new Date($userAuthStore.lastLoggedIn.seconds * 1000 + $userAuthStore.lastLoggedIn.nanoseconds/1000000).toDateString()} </span>
			</div>
		</div>
		<div class="flex justify-center">
			{#if user.profile==undefined && avatar!=undefined && user.profile!=avatar}
			<ActionBtn 
			title={'Save new Image'}
			click={()=>{
				saveProfileImage(user.uid,{avatar:avatar, businessName:$businessStore.name,name:user.name})
			}}/>
			{/if}
		</div>
	</div>
	
</div>
