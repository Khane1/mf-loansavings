<script>
	import { timestampToDateTime } from '../../../../functions/func_essential';
	import { screenSizeStore } from '../../../../functions/funcs/stores';

	export let data, isDetail, userData;
</script>

<tr
	class=" bg-slate-50 space-y-4"
	style="cursor: pointer;"
	on:click={() => ((userData = data), (isDetail = true))}
>
	{#if $screenSizeStore.size < 1000}
		<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap">{data.name} </td>

		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			{data.completed}
			<!-- {MoneyFormat(item.total)} -->
		</td>
		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			{data.paid}
			<!-- {MoneyFormat(item.total)} -->
		</td>
	{:else}
		<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap">{data.name} </td>
		<td class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap ">
			{timestampToDateTime(data.opened)}
		</td>
		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"> {data.nin}</td>
		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{data.status}</td>
		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			{data.contact}
			<!-- {item.qty} -->
		</td>
		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			{data.completed}
			<!-- {MoneyFormat(item.total)} -->
		</td>
		<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
			{data.paid}
			<!-- {MoneyFormat(item.total)} -->
		</td>
	{/if}
</tr>
