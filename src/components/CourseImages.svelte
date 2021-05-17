<script>
    import {onMount, getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {currentCourse, user} from "../Stores";

    const golfPOIService = getContext("GolfPOIService");

    export let imageCourse={};
    export let currentUser={};
    let errorMessage = ""
    let images=[];
    let currentGolfPOI;

    onMount(async () => {
        images = await golfPOIService.getImageList(imageCourse.relatedImages)
    })

    async function deleteImage(imageId) {
        // Retrieve the course document from the golfPOI collection.
        const updateCourse = await golfPOIService.getCourse(imageCourse._id);

        // Find the array element matching the image id and remove from the relatedImages array
        // Then save the course document back to the collection.
        const elementId = updateCourse.relatedImages.indexOf(imageId);
        const removedItem = updateCourse.relatedImages.splice(elementId,1);
        console.log(updateCourse);
        let success = await golfPOIService.updateGolfPOI(imageCourse._id, currentUser._id, updateCourse)
        if (success) {
            push("/courseReport");
        } else {
            errorMessage = "Could Not Delete Image"
        }
    }
</script>

<div class="uk-container uk-padding-small">
    <div class="uk-child-width-1-4@s uk-flex uk-flex-center" uk-grid uk-height-match="target: .uk-card">
        {#each images as image}
            <div class="uk-card uk-card-default uk-card-small uk-text-center uk-text-baseline uk-animation-scale-up">
                <div class="uk-card-media-top">
                    <img src="{image.url}" width="400" height="220">
                </div>

                <div class="uk-card-footer">
                    <button on:click={deleteImage(image.public_id)} class="uk-button-danger uk-button-primary uk-button-small uk-width-1-1">Delete</button>
                </div>
            </div>
        {/each}
    </div>
</div>