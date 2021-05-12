<script>
    import {onMount, getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {currentCourse} from "../Stores";


    const golfPOIService = getContext("GolfPOIService");
    let errorMessage = ""
    let imageList=[];
    onMount(async () => {
        const currentGolfPOI = await golfPOIService.getCourse($currentCourse._id);
        imageList = await golfPOIService.getImageList(currentGolfPOI.relatedImages);
    })

    async function deleteImage(categoryId) {
        /*let success = await golfPOIService.deleteImage(categoryId)
        if (success) {
            imageList = await golfPOIService.getImageList();
            push("/addCategory");
        } else {
            errorMessage = "Could not delete Image";
        }
        */
        return true;
    }
</script>

<div>
    <div class="uk-card uk-card-default uk-card-small uk-text-center uk-text-baseline uk-animation-scale-up">
        {#each imageList as url}
            <div class="uk-card-media-top">
                <img src="{url}">
            </div>
            <div>
                <div class="uk-card-footer">
                    <td><button on:click={deleteImage(url._id)} class="uk-button-danger uk-button-primary uk-button-small uk-width-1-1">Delete</button></td>
                </div>
            </div>
        {/each}
    </div>
</div>