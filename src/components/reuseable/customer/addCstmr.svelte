<script>
	import Input from '../input/input.svelte';

	export let type, label, isText, value;
</script>

<div class="py-2">
	<div class="w-80">
		<Input {type} placeholder={label} {isText} bind:value />
	</div>
	<label for="input" class="text-sm">
		{label}
	</label>
</div>
