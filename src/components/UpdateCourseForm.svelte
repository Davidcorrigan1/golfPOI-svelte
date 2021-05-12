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
    let selected;

    onMount(async () => {
        categories = await golfPOIService.getCategoryList();
        currentGolfPOI = await golfPOIService.getCourse($currentCourse._id);
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
    </fieldset>
    {#if errorMessage}
        <div class="uk-text-left uk-text-small">
            {errorMessage}
        </div>
    {/if}
</form>