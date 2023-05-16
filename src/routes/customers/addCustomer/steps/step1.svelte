<script>
	import Avatar from '../../../../components/reuseable/avatar/avatar.svelte';
	import AddCstmr from '../../../../components/reuseable/customer/addCstmr.svelte';
	export let name, nin, contact,avatar;
</script>
<div class="mb-10">
    <div class="flex justify-center ">
        {#if avatar.length==0}
        <Avatar src="" size="30" upload={true} bind:avatar/>
        {:else}
        <Avatar src={avatar} size="30" />
        {/if}
    </div>
    <div class=" flex justify-center pt-1 text-xs">
        {#if avatar==undefined}
        <span>Please click here to add image</span>
        {/if}
    </div>
    <div class="flex justify-center text-sm text-gray-600 pt-2">
        <span>Customer image</span>
    </div>
</div>
<AddCstmr type="Text" label="Customer Name" isText={true} bind:value={name} />
<AddCstmr type="Text" label="National ID" isText={true} bind:value={nin} />
<AddCstmr type="number" label="Phone Number" isText={false} bind:value={contact} />
