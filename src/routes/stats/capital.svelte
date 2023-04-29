<script>
	import ActionBtn from '../../components/reuseable/buttons/actionBtn.svelte';
	import Input from '../../components/reuseable/input/input.svelte';
	import { updateCapital } from '../../functions/funcs/firebase/userFuncs/fb_business';
	import { businessStore } from '../../functions/funcs/stores';
	let amount;
</script>

<div class="flex justify-center  pt-10">
	<div class="w-72 space-y-5 p-5 shadow-lg rounded-lg py-5">
		<span class="text-sm flex text-center">
			<div>
				Your current capital on site is 0.
				<p class="text-xs">
					Please update your current capital on site available for lending purposes.
				</p>
			</div>
		</span>
		<div>
			<Input
				bind:value={amount}
				placeholder="Amount"
				keydown={() => {}}
				isText={false}
				type="number"
			/>
			<div class="flex text-justify">
				<span class="text-xs font-medium text-red-700 pt-1"
					>To help us make fairly accurate reports for your business, we require that you submit
					your available lending capital.
					<p class="font-normal" />
				</span>
			</div>
		</div>
		<div class="flex justify-center">
			<ActionBtn
				title="Save Capital"
				click={() => {
					if (amount != 0) {
						let calc = $businessStore.capital + amount;
						updateCapital($businessStore.BusinessId, calc);
					}
				}}
			/>
		</div>
	</div>
</div>
<!-- These are the things  that will affect capital value.
    This requires cap to be a snapshot
1. Giving a loan will sub from cap
2. Receiving money from loan payment add to capital
3. Daily report will add or sub from capital -->
