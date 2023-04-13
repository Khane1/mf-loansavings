<script>
	import Bodywrapper from '../../components/bodywrapper.svelte';
	import Avatar from '../../components/reuseable/avatar/avatar.svelte';
	import AvatarName from '../../components/reuseable/avatar/avatarName.svelte';
	import ActionBtn from '../../components/reuseable/buttons/actionBtn.svelte';
	import TeamCard from '../../components/reuseable/team card/teamCard.svelte';

	import PageTitle from '../../components/reuseable/title/pageTitle.svelte';
	import { customersStore, teamStore, userAuthStore } from '../../functions/funcs/stores';
	import AddTeamate from './add/addTeamate.svelte';
	import TMDetails from './t_m_Details/t_m_details.svelte';
	let isDetail = false;
	let data;
</script>

<div class="pb-1">
	<div class="flex justify-center pb-2">
		<PageTitle title="Team 💪" />
	</div>
	<div class="flex justify-center ">
		<div class="bg-slate-100">
			<h3>You can change your team roles here.</h3>
		</div>
	</div>
	<div class="flex justify-center mt-3"><AddTeamate /></div>
</div>
{#if isDetail}
	<TMDetails bind:isDetail bind:data />
{:else}
	<div class="flex justify-center">
		<div class="pl-10 ">
			<TeamCard
				data=""
				click={() => {}}
				role={$userAuthStore.role}
				src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8&w=1000&q=80"
				name={$userAuthStore.name}
			/>
			{#if $teamStore.value != undefined}
				{#each $teamStore.value as mem}
					<TeamCard
						click={() => {
							(isDetail = true), (data = mem.data);
						}}
						role={mem.data.roleVal}
						src={mem.data?.memberUrl ??
							'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8&w=1000&q=80'}
						name={mem.data.name}
					/>
				{/each}
			{/if}
		</div>
	</div>
{/if}
<!-- //collaborators -->
