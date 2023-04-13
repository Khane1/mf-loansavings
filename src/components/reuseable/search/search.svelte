<script>
	import { convertDate4InputMin, dateTransfer } from '../../../functions/func_essential';
	import ActionBtn from '../buttons/actionBtn.svelte';
	import Input from '../input/input.svelte';
	export let search, searchBy;
	export let toDate = '', fromDate = '';
</script>

	{#if searchBy == 'name'}
		<div class="w-30">
			<Input
				placeholder="Live Search for customer"
				bind:value={search}
				keydown={() => {}}
				isText={true}
				type="text"
			/>
		</div>
	{:else}
		<div class="space-x-2">
            <label for="from" class="text-sm"> From</label>
			<input class="text-sm border" bind:value={fromDate} 
            max={new Date().toISOString().split("T")[0]}
            
           type="date" />
           {#if fromDate != undefined && fromDate != ""}
           <label for="To" class="text-sm"> To</label>
           <input class="text-sm border" bind:value={toDate} 
               min={fromDate}
               max={new Date().toISOString().split("T")[0]}
           type="date" />
       {:else}
           <input disabled class="text-sm text-slate-300" type="date" />
       {/if}
		</div>
	{/if}

