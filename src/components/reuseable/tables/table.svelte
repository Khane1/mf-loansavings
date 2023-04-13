<script>
	export let headers;
</script>

<div class="flex flex-col">
	<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
			<div class="overflow-hidden">
				<table class="min-w-full">
					<thead class="border-b">
						<tr>
							{#each headers as header}
								<th scope="col" class="text-sm font-medium px-6 py-3 text-left">
									{header}
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						<slot />
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<style>
	table thead {
		border: 1.5px solid rgba(0, 0, 0, 0.949);
		background-color: #f2f2f2;
	}
</style>
