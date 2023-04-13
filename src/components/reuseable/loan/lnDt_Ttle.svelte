<script>
    export let title; 
    export let unit=''; 
    export let isSub=false; 
    export let hasUnit=false; 

</script>

{#if isSub}
<div>
    {#if hasUnit}
    <span class="pt-10 text-xs text-slate-800">{unit}</span>
    
    {/if}
    <span class="font-semibold text-xl text-slate-700">{title}</span>
</div>

{:else}
<span class="font-medium text-md text-slate-800 ">{title}</span>
{/if}