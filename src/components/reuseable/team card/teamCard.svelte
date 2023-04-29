<script>
	import { roles } from '../../../functions/func_essential';
	import { businessStore, userAuthStore } from '../../../functions/funcs/stores';
	import Avatar from '../avatar/avatar.svelte';
	import AvatarName from '../avatar/avatarName.svelte';
	export let role;
	export let src;
	export let name,click;
</script>


	<div class=" pt-5 flex justify-start pr-10">
		<Avatar {src} />
		<div class="pl-2">
			<AvatarName top="1" {name} />
			<div class="pl-2 text-sm">{role}</div>
		</div>
		{#if $userAuthStore.role != roles.admin}
			<div class="ml-10 xpt-3 px-2 rounded-lg text-sm">
				{role}
			</div>
		{:else if $businessStore.admin.includes($userAuthStore.uid)}
			{#if role == roles.admin}
				<div class="px-12 pt-3 rounded-lg text-sm">
					{role}
				</div>
			{:else}
				<div class="ml-10 xpt-3 px-2 rounded-lg text-sm">
					<!-- <select id="cars" name="cars" class="text-black">
						{#each Object.keys(roles) as role}
						<option value={role}>{role}</option>
						{/each}
					</select> -->
					<div>
						<span class="text-sm border px-2 py-1 rounded" on:keypress on:click={()=>click()}>See details</span>
					</div>
				</div>
			{/if}
		{/if}
	</div>

