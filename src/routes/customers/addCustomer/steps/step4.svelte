<script>
	import { roles } from '../../../../functions/func_essential';
	import { teamStore } from '../../../../functions/funcs/stores';
    export let fieldAgent;
</script>
{fieldAgent}
<div class="ml-10 xpt-3 px-2 rounded-lg text-sm ">
	<label for="">Field Agent :</label>
	<select id="cars" name="cars" class="text-black border" bind:value={fieldAgent}>
		{#each $teamStore.value as mem}
			{#if mem.data.roleVal == roles.fieldAgent}
				<option value={mem.data.name}>{mem.data.name}</option>
			{/if}
		{/each}
	</select>
</div>
