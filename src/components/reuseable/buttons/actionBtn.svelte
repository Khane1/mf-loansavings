<script>
	import { screenSizeStore } from "../../../functions/funcs/stores";

	export let title = '';
	export let click;
	export let danger;
	
</script>

{#if danger==undefined||danger}

<button
	on:click={click}
	on:keydown={click}
	class="btn mx-2 px-5 py-2 rounded-md text-slate-50 text-xs font-medium"
>
	{title}
</button>
{:else}
<button
	on:click={click}
	on:keydown={click}
	class="danger btn mx-2 px-5 py-2 rounded-md text-slate-50 text-xs font-medium"
>
	{title}
</button>
{/if}
<style>
	button.btn {
		background: #414141;
	}
	button:hover {
		font-weight: 600;
		background-color: #39f179;
		color: #414141;
	}
    .danger:hover{
		font-weight: 600;
		background-color: #f13948;
		color: #f1f1f1;
	}
</style>
