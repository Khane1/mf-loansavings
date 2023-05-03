<script>
	import Modal from '../modal/modal.svelte';
	import { cliq_notify } from '../notificationsToast/onNotify';

	let fileinput;
	export let src,
		upload = false,
		avatar;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};
	export let size = 0;
	let formNo = 1;
	function changePage() {}
</script>
{#if (src != 'undefined' && src?.length > 0 && upload == true)||(src != 'undefined' && src?.length > 0 && upload != 'undefined' && upload == false) }
	<img
		on:keypress
		style="object-fit:cover"
		class="{size == 0
			? 'w-10 h-10'
			: 'w-20 h-20'} p-1 rounded-full ring-2 ring-slate-800 dark:ring-gray-500"
		{src}
		alt="Bordered avatar"
	/>
{:else if upload == false && (src == undefined || src?.length == 0)}
	<div>
		<div class="flex justify-center">
			<img
				on:keypress
				style="object-fit:cover"
				class="{size == 0
					? 'w-10 h-10'
					: 'w-20 h-20'} p-1 rounded-full ring-2 ring-slate-800 dark:ring-gray-500"
				src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
				alt="Bordered avatar"
			/>
		</div>
	</div>
{:else if avatar != undefined}
	<div>
		<div class="flex justify-center">
			<img
				on:keypress
				style="object-fit:cover"
				class="{size == 0
					? 'w-10 h-10'
					: 'w-20 h-20'} p-1 rounded-full hover:blur-sm hover:ring-red-600 ring-2 ring-slate-800 dark:ring-gray-500"
				src={avatar}
				on:click={() => {
					avatar = undefined;
					cliq_notify('d', 'Image removed');
				}}
				alt="Bordered avatar"
			/>
		</div>
		<div class="text-xs pt-2">
			<span>Click image to remove it</span>
		</div>
	</div>
{:else}
	<Modal
		createTitle={'continue'}
		title={'Add Image'}
		modalTitle={'Upload an Image'}
		nextButton={formNo < 1}
		nextFunc={() => changePage()}
		close={() => (formNo = 1)}
		action={() => {}}
	>
		<div class="relative flex justify-center">
			<!-- {avatar} -->

			<input
				style="display:none"
				type="file"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => onFileSelected(e)}
				bind:this={fileinput}
			/>
			<img
				on:keypress
				style="object-fit:cover"
				class="{size == 0
					? 'w-10 h-10'
					: 'w-20 h-20'} p-1 rounded-full ring-2 ring-slate-800 dark:ring-gray-500"
				src={avatar}
				on:click={() => {
					fileinput.click();
				}}
				alt="Bordered avatar"
			/>
		</div>
	</Modal>
{/if}
