<script>
	import Avatar from '../../../../components/reuseable/avatar/avatar.svelte';
	import AvatarName from '../../../../components/reuseable/avatar/avatarName.svelte';
	import AddCstmr from '../../../../components/reuseable/customer/addCstmr.svelte';
	import CtmrDtl from '../../../../components/reuseable/customer/ctmrDtl.svelte';
	import Input from '../../../../components/reuseable/input/input.svelte';
	import { roles } from '../../../../functions/func_essential';
	export let name, nin, contact, roleVal,avatar;
</script>

<div class="space-y-2 px-5">
	<div class="flex justify-center pb-5">
		<Avatar size="1" src='' bind:avatar upload={true}/>
	</div>
	<AddCstmr type="Text" label="Team member Name" isText={true} bind:value={name} />
	<AddCstmr type={'text'} label="Nin Number" isText={true} bind:value={nin} />
	<AddCstmr type={'text'} label="Phone Number" isText={true} bind:value={contact} />
	<div class="flex justify-start">
		<div class="pt-3 pr-10 pl-4 shadow-lg py-4 text-sm ">
			<label for="" class="font-bold">Set their Role:</label>
			<select id="cars" name="cars" class="text-black" bind:value={roleVal}>
				{#each Object.keys(roles) as role}
					<option value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
				{/each}
			</select>
		</div>
	</div>
</div>

