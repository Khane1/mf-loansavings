<script>
	import { cliq_notify } from "../notificationsToast/onNotify";


	export let searchBy;
</script>

<div class="flex text-xs pb-4">
	<span class="text-sm pr-2">Switch to</span>
	<div class=" space-x-2 ">
        {#if searchBy=='date'}
		<span
			class="border rounded px-4 py-1 font-bold shadow-md"
			on:keypress
			on:click={() => {
				searchBy = 'name';
                cliq_notify('i','Switched to search by name')
			}}
		>
		Search by Name </span
		>
        {:else}
		<span
			class="border rounded px-4 py-1 font-bold shadow-md"
			on:keypress
			on:click={() => {
				searchBy = 'date';
                cliq_notify('s','Switched to search by date')
			}}
		>
			Search by Date</span
		>
        {/if}
	</div>
</div>
