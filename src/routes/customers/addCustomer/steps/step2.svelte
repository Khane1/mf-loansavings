<script>
	import AddCstmr from '../../../../components/reuseable/customer/addCstmr.svelte';
	export let occupation, address, location;
</script>

<AddCstmr type="Text" label="Occupation" isText={true} bind:value={occupation} />
<AddCstmr type="Text" label="Address" isText={true} bind:value={address} />
<AddCstmr type="Text" label="Location" isText={true} bind:value={location} />
