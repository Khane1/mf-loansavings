<script>
	import Input from '../../components/reuseable/input/input.svelte';

	import { signIn } from '../../functions/funcs/firebase/auth';
	import { emailStore } from '../../functions/funcs/stores';
	export let email, password;
	function onPageChange(newPage) {
		page = newPage;
	}
</script>

<div>
	<span class="text-sm">Email</span>
	<Input placeholder="Input your email" bind:value={email} />
</div>
<div>
	<span class="text-sm">Password</span>
	<Input placeholder="Input your password" bind:value={password} />
</div>

{#if email && password.length > 6 && password.length > 6}
	<span
		on:keypress
		on:click={() => signIn(email, password)}
		class="flex justify-center border px-5 py-2 mt-5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
		>Sign In</span
	>
{:else}
	<span class="flex justify-center border px-5 py-2 mt-5 bg-gray-400 text-gray-500 rounded-full"
		>Sign In</span
	>
{/if}

<style>
</style>
