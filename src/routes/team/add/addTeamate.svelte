<script>
	import { onMount } from 'svelte';
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import TeamSettings from '../../settings/pages/teamSettings.svelte';
	import CreateProfile from './user Profile/createProfile.svelte';
	import {addNewTeamMember} from '../../../functions/funcs/firebase/userFuncs/fb_team'
	import { businessStore, teamStore } from '../../../functions/funcs/stores';
	let formNo = 1;
	function changePage() {
		formNo++;
		formNo = formNo <= 2 ? formNo : 1;
	}
	let options = [
		{ state: true, title: 'Yes, they will.' },
		{ state: false, title: 'No, they won\'t.' }
	];
    let newState=undefined;
    onMount((e)=>{
        newState=undefined;
    })
    let name,nin,contact,roleVal,avatar;
</script>

<Modal
	createTitle={'Save Customer'}
	title={'Add Team member ✜'}
	modalTitle={'Team member'}
	nextButton={formNo < 2}
	nextFunc={() => changePage()}
	close={() => (formNo = 1)}
	action={()=>addNewTeamMember($businessStore.BusinessId,{avatar:avatar,businessName:$businessStore.name,name:name}, {name,nin,contact,roleVal})}
>
	{#if formNo == 1}
		<div class="p-5">
			<div class="text-center">
				Will this member need to
				<p>access to the platform?</p>
			</div>
			<div class="flex justify-evenly py-5">
				{#each options as opt}
					<ActionBtn click={()=>{newState=opt.state,changePage()}} danger={opt.state} title={opt.title} />
					<div />
				{/each}
			</div>
		</div>
	{:else if formNo == 2}
    {#if newState}
    <TeamSettings/>
    {:else}
    <CreateProfile bind:name bind:nin bind:contact bind:roleVal bind:avatar/> 
{/if}
<!--
	<Step2 bind:occupation bind:address bind:location/>
	{:else if formNo == 3}
	<Step3 bind:gua_occupation bind:guarantor_name bind:guarantor_phoneNumber bind:guarantor_nin/>
	{:else if formNo == 4}
	<Step4/> -->
	{/if}
</Modal>
