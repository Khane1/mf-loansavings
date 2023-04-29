<script>
	export let active = false;
	export let name = '';
	export let click;
</script>

{#if active}
	<span
		on:keypress
		on:click={() => {
			click();
		}}
		class="active px-4 py-1 border text-sm rounded-md  border-slate-700 ">{name}</span
	>
{:else}
	<span
		on:keypress
		on:click={() => {
			click();
		}}
		class="inActive px-4 py-1 border text-sm  text-white">{name}</span
	>
{/if}

<style>
	.active {
		background-color:  #39f179;
		color: #414141;
	}

	span:hover {
		background-color: #39f179;
		color: #414141;
	}

	.inActive {
		background-color: #414141;
	}
</style>
