<script>
	import ActionBtn from '../../../components/reuseable/buttons/actionBtn.svelte';

	let showModal = false;
	export let nextButton, nextFunc, modalTitle, title, close, createTitle, action;
	function toggleModal() {
		showModal = !showModal;
	}
</script>

<!-- <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModal}>
      Open regular modal
    </button> -->
<div class="ease-linear transition-all duration-150" type="button" on:keypress>
	<ActionBtn click={toggleModal} {title} />
</div>

{#if showModal}
	<div
		class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
	>
		<div class="relative w-auto my-6 mx-auto max-w-3xl">
			<!--content-->
			<div
				class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
			>
				<!--header-->
				<div
					class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
				>
					<h3 class="text-xl font-semibold">{modalTitle}</h3>
					<button
						class="p-1 ml-auto bg-transparent border-0 text-slate-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
						on:click={toggleModal}
					>
						<span class=" text-slate-500  h-6 w-6 text-2xl block "> × </span>
					</button>
				</div>
				<!--body-->
				<div class="relative p-6 flex-auto">
					<slot />
				</div>
				<!--footer-->
				<div
					class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
				>
					<button
						class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						type="button"
						on:click={() => {
							toggleModal(), close();
						}}
					>
						Close
					</button>
					{#if nextButton == true}
						<ActionBtn title="Next" click={nextFunc} />
					{:else}
						<button
							class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							on:click={nextFunc}
						>
							Back
						</button>
						<ActionBtn
							title={createTitle}
							click={() => {
								action(), toggleModal(), close();
							}}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
