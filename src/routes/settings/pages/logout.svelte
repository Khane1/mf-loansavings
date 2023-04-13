<script>
	import { signOut } from "../../../functions/funcs/firebase/auth";


    // import { signOut } from "../../firebase/functions/auth";
    export let message='';
</script>

<div class="space-y-5">
    <div class=" mt-10 flex justify-center text-lg font-semibold">Log out</div>
    <div class=" flex justify-center">
        <span class="flex items-center ">{message.length==0? "Are you sure":message} </span>
    </div>
    <div class="space-y-10 flex justify-center">
        <span
        on:keypress
            class="border px-5 py-1 mb-5 bg-red-500 text-white rounded-full"
            on:click={() => {signOut()}}>Logout</span
        >
    </div>
</div>