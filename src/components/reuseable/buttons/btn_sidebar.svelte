<script>
    export let title='';
    export let isActive=false;
    export let click;
</script>
{#if isActive}
<button on:click={click}   class="active w-60 text-md py-3 rounded-full text-black font-bold">
    {title}
</button>
{:else}
<button on:click={click} style="background-color:#414141"  class="w-60 text-md py-3 rounded-full  text-white">
    {title}
</button>
{/if}

<style>
 .active{
        background-color:#39F179;
        border: 2px solid black;
    }
</style>