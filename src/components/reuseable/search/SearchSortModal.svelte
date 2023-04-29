<script>
	import Modal from '../modal/modal.svelte';
	let formNo = 1;
	export let submit, fromDate, toDate,title;
</script>

<Modal
	createTitle={'Search'}
	title={'Date Search'}
	modalTitle={title}
	nextButton={formNo < 1}
	nextFunc={() => {}}
	close={() => (formNo = 1)}
	action={() => {
		submit();
	}}
>
	
	<div class="space-x-2">
		<label for="from" class="text-sm"> From</label>
		<input
			class="text-sm border"
			bind:value={fromDate}
			max={new Date().toISOString().split('T')[0]}
			type="date"
		/>
		{#if fromDate != undefined && fromDate != ''}
			<label for="To" class="text-sm"> To</label>
			<input
				class="text-sm border"
				bind:value={toDate}
				min={fromDate}
				max={new Date().toISOString().split('T')[0]}
				type="date"
			/>
		{:else}
			<input disabled class="text-sm text-slate-300" type="date" />
		{/if}
	</div>
</Modal>
