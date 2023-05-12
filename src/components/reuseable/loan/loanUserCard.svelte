<script>
	import GiveLoan from '../../../routes/loans/issueLoan/giveLoan/giveLoan.svelte';
	import Avatar from '../avatar/avatar.svelte';
	import AvatarName from '../avatar/avatarName.svelte';
	import ActionBtn from '../buttons/actionBtn.svelte';
	export let status;
	export let src;
	export let name,index;
	
</script>
<div class=" pt-5 flex justify-center pr-10 ">
    <span class="pr-4 pt-2 font-semibold">{index+1}.</span>
	<Avatar src={src.length>0?src:undefined} upload={false}/>
	<div class="px-2 w-32">
		<AvatarName top="1" {name} />
		<div class="pl-2 text-sm">{status}</div>
	</div>
    <div class="pl-5 ">
	<slot></slot>
       
    </div>
</div>

