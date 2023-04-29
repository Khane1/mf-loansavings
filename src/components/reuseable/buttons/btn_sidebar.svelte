<script>
    export let title='';
    export let isActive=false;
    export let click;
</script>
{#if isActive}
<button on:click={click}   class="active w-52 text-sm py-3 rounded-3xl shadow-xl text-black font-bold">
    {title}
</button>
{:else}
<button on:click={click} style="background-color:#414141"  class="w-52 border-2 border-slate-700 text-sm py-3 rounded-3xl  text-white">
    {title}
</button>
{/if}

<style>
 .active{
        background-color:#39F179;
        border: 2px solid black;
    }
</style>