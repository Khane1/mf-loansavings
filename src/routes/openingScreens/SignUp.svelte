<script>
	import Input from '../../components/reuseable/input/input.svelte';
	import { signUpRoute } from '../../functions/funcs/server.js';

	export let email, pass, password, name;
	let businessName;
	// import { signUp } from "../../firebase/functions/auth";
	import { emailStore, pageRouteStore, userAuthStore } from '../../functions/funcs/stores';
    
</script>
<div>
	<span class="text-sm">Name</span>
	<Input type="text" placeholder="Please input your name." bind:value={name} />
</div>
<div>
	<span class="text-sm">Business Name</span>
	<Input type="name" placeholder="What's you business name?" bind:value={businessName} />
</div>
<div>
	<span class="text-sm">Email</span>
	<Input type="email" placeholder="Input your email" bind:value={email} />
</div>
{#if $pageRouteStore.pageName == 'collab'}
	<div>
		<span class="text-sm">Name</span>
		<Input type="text" placeholder="Input your userName" bind:value={name} />
	</div>
{/if}

<div>
	<span class="text-sm">Password</span>
	<Input placeholder="Input your password" bind:value={pass} />
</div>
<div>
	<span class="text-sm">Confirm Password</span>
	<Input placeholder="Confirm your password" bind:value={password} />
</div>

<span
	on:keypress
	on:click={() => signUpRoute(email, password,{pgName:'signup',businessName,name})}
	class="flex justify-center border px-5 py-2 mt-5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
	>Sign Up</span
>
<!-- {#if $emailStore && pass == password && pass.length > 6 && password.length > 6} -->
<!-- on:click={() => {
            $pageNameStore.pageName != "collab"
                ? signUp(email, password, {})
                : signUp(email, password, {
                      pgName: $pageNameStore.pageName,
                      b_Id: $collabBusinessId.businessId,
                      userName: name,
                  });
        }} -->

<!-- {:else} -->
<!-- <span
        class="flex justify-center border px-5 py-2 mt-5 bg-gray-400 text-gray-500 rounded-full"
        >Sign Up</span
    > -->
<!-- {/if} -->
