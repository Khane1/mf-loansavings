<script>
    export let burger;
</script>
{#if burger}
<div class="space-y-1 mt-5">

    <div>
        <hr class="bg-slate-800 w-7 h-1 rounded-2xl">
    </div>
<div>
    <hr class="bg-slate-800 w-7 h-1 rounded-2xl">
</div>
<div>
    <hr class="bg-slate-800 w-7 h-1 rounded-2xl">
</div>
</div>
{:else}
<div class="font-bold text-5xl mt-1">×</div>
{/if}

