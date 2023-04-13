<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notifications } from './notifications.js';

	export let themes = {
		danger: '#FF5067',
		success: '#39F179',
		warning: '#FF9200',
		info: '#00B3FF',
		default: '#9FAFA1'
	};
</script>

<div class="notifications">
	{#each $notifications as notification (notification.id)}
		<div
			animate:flip
			class="toast px-3 text-center rounded-full shadow-2xl text-sm border-solid border-black"
			style="background: {themes[notification.type]};"
			transition:fly={{ y: 50 }}
		>
			<div class={notification.type!='success'&&notification.type!='info'?'content':"oppositeContent"}>{notification.message}</div>
			{#if notification.icon}<i class={notification.icon} />{/if}
		</div>
	{/each}
</div>

<style>
	.notifications {
		position: fixed;
		bottom: 50px;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		pointer-events: none;
		border-radius: 4px;
	}

	.toast {
		flex: 0 0 auto;
		margin-bottom: 10px;
		border: 2px solid black;
	}

	.content {
		padding: 10px;
		display: block;
		color: white;
		font-weight: 500;
	}
	.oppositeContent {
		padding: 10px;
		display: block;
		color: rgb(42, 40, 40);
		font-weight: 600;
	}
</style>
