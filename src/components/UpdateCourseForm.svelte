<script>
    import {user, currentCourse} from "../Stores";
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

        let response = await golfPOIService.updateGolfPOI(currentGolfPOI._id, $user._id, updateGolfPOI)
        if (response.success) {
            push("/courseReport");
        } else {
            errorMessage = response.message;
        }
    }
</script>

<div class="uk-margin uk-width-1xlarge uk-card uk-card-default uk-card-body uk-box-shadow-large">
<form class="uk-form-stacked" on:submit|preventDefault={updateGolfPOI}>>
    <fieldset class="uk-fieldset">
        <div class="uk-margin uk-fieldset uk-text-left">
            <label class="uk-form-label" ><h3>Update Course Name</h3></label>
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: dribbble"></span>
                <input bind:value={courseName} class="uk-input uk-form-large" type="text" name="courseName">
            </div>
        </div>
        <div class="uk-margin uk-text-left">
            <label class="uk-form-label" ><h3>Enter Course Description</h3></label>
            <div class="uk-form-row">
                <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" ></span>
                    <textarea bind:value={courseDesc} name="courseDesc" rows="5" class="uk-textarea uk-form-medium" ></textarea>
                </div>
            </div>
        </div>
        <div class="uk-margin uk-text-left uk-width-2-6" uk-grid>
            <div class="uk-inline uk-width-1-3">
                <label class="uk-form-label" ><h3>Update Provinces</h3></label>
                <div uk-select>
                    <select bind:value={selected} class="uk-select uk-form-large">
                        {#each categories  as category}
                            <option value={category._id}>
                                { category.province}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
            <div class="uk-width-1-3">
                <label class="uk-form-label" ><h3>latitude</h3></label>
                <span class="uk-form-icon" ></span>
                <input bind:value={currentLatitude} class="uk-input uk-form-large" type="decimal" name="latitude" >
            </div>

            <div class="uk-width-1-3">
                <label class="uk-form-label" ><h3>longitude</h3></label>
                <span class="uk-form-icon" ></span>
                <input bind:value={currentLongitude} class="uk-input uk-form-large" type="decimal" name="longitude" >
            </div>
        </div>
        <div class="uk-margin uk-text-left">
            <button class="uk-button uk-button-primary uk-button-large uk-width-1-6">Save </button>
        </div>
        {#if errorMessage}
            <div class="uk-text-left uk-text-large">
                {errorMessage}
            </div>
        {/if}
    </fieldset>
</form>
</div>