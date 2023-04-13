<script>
    let value = "";
    import { businessStore,  screenSizeStore } from "../../../functions/funcs/stores";
    // import { getNotificationsContext } from "svelte-notifications";
    // const { addNotification } = getNotificationsContext();
</script>

<div class="{$screenSizeStore.size>800?'p-10':'p-4'} space-y-5">
        <span class="text-md flex justify-center">
            Click the button to get a shareable<br/> signup link for your team.
        </span>
        <div />
        
    <div class="mb-3 ">
        <div class="flex justify-center">
            <span 
            on:keypress
                on:click={async () => {
                    await navigator.clipboard.writeText(
                        window.location.origin +
                            "/teamcollab/" +
                            $businessStore.BusinessId +
                            "/signup"
                    );
                    // notifyUser("Team Link Copied", addNotification, "success");
                }}
                class="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 text-white shadow rounded"
                >Copy sharable link.</span
            >
        </div>
    </div>
</div>
