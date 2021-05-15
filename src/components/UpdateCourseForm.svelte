<script>
    import {user, currentCourse} from "../stores";
    import { push } from "svelte-spa-router";
    import {getContext, onMount} from "svelte";
    const golfPOIService = getContext("GolfPOIService");

    let errorMessage = "";

    let categories = []
    let currentGolfPOI;
    let currentLongitude = 0.0;
    let currentLatitude = 0.0;
    let courseName="";
    let courseDesc="";
    let courseId="";
    let selected;
    let images = [];

    onMount(async () => {
        categories = await golfPOIService.getCategoryList();
        currentGolfPOI = await golfPOIService.getCourse($currentCourse._id);
        images = await golfPOIService.getImageList($currentCourse.relatedImages)
        currentLatitude = currentGolfPOI.location.coordinates[1];
        currentLongitude = currentGolfPOI.location.coordinates[0];
        courseName = currentGolfPOI.courseName;
        courseDesc = currentGolfPOI.courseDesc;
        selected = currentGolfPOI.category;
    })

    async function deleteImage(imageId) {
        // Retrieve the course document from the golfPOI collection.
        const updateCourse = await golfPOIService.getCourse(currentGolfPOI._id);

        // Find the array element matching the image id and remove from the relatedImages array
        // Then save the course document back to the collection.
        const elementId = updateCourse.relatedImages.indexOf(imageId);
        const removedItem = updateCourse.relatedImages.splice(elementId,1);
        console.log(updateCourse);
        let success = await golfPOIService.updateGolfPOI(currentGolfPOI._id, $user._id, updateCourse)
        if (success) {
            push("/courseReport");
        } else {
            errorMessage = "Could Not Delete Image";
        }
    }
    async function updateGolfPOI() {
        let updateGolfPOI = {
            location : {
                type: "Point",
                coordinates: [currentLongitude, currentLatitude ]
            },
            relatedImages : [],
            courseName : courseName,
            courseDesc : courseDesc,
            category: selected,
            lastUpdatedBy: $user._id
        }

        let success = await golfPOIService.updateGolfPOI(currentGolfPOI._id, $user._id, updateGolfPOI)
        if (success) {
            push("/courseReport");
        } else {
            errorMessage = "Could Not update Golf POI";
        }
    }
</script>

<form class="uk-form-stacked" on:submit|preventDefault={updateGolfPOI}>>
    <fieldset class="uk-fieldset">
        <div class="uk-margin uk-fieldset uk-text-left">
            <label class="uk-form-label" for="form-stacked-text">Update Course Name</label>
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: dribbble"></span>
                <input bind:value={courseName} class="uk-input uk-form-large" type="text" name="courseName">
            </div>
        </div>
        <div class="uk-margin uk-text-left">
            <label class="uk-form-label" for="form-stacked-text">Enter Course Description</label>
            <div class="uk-form-row">
                <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: dribbble"></span>
                    <textarea bind:value={courseDesc} name="courseDesc" rows="10" class="uk-input uk-form-large" ></textarea>
                </div>
            </div>
        </div>

        <div class="uk-margin uk-text-left">
            <label class="uk-form-label" for="form-stacked-text">Update Provinces</label>
            <div class="uk-inline uk-width-1-6">
                <div uk-select>
                    <select bind:value={selected} class="uk-select">
                        {#each categories  as category}
                            <option value={category._id}>
                                { category.province}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
        <div class="uk-margin uk-text-left uk-width-2-6">
            <label class="uk-form-label" for="form-stacked-text">latitude</label>
            <div class="uk-width-1-6">
                <span class="uk-form-icon" ></span>
                <input bind:value={currentLatitude} class="uk-input uk-form-large" type="decimal" name="latitude" >
            </div>
            <label class="uk-form-label" for="form-stacked-text">longitude</label>
            <div class="uk-width-1-6">
                <span class="uk-form-icon" ></span>
                <input bind:value={currentLongitude} class="uk-input uk-form-large" type="decimal" name="longitude" >
            </div>
        </div>
        <div class="uk-margin uk-text-left">
            <button class="uk-button uk-button-primary uk-button-large uk-width-1-6">Save </button>
        </div>
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
    </fieldset>
    {#if errorMessage}
        <div class="uk-text-left uk-text-small">
            {errorMessage}
        </div>
    {/if}
</form>