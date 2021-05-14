<script>
    import {user} from "../stores";
    import {push} from "svelte-spa-router";
    import {getContext, onMount} from "svelte";
    import CourseImages from "./CourseImages.svelte";

    const golfPOIService = getContext("GolfPOIService");

    let errorMessage = "";

    let categories = []
    onMount(async () => {
        categories = await golfPOIService.getCategoryList();
    })
    let courseName = "";
    let courseDesc = "";
    let longitude = "";
    let latitude = "";
    let province = "";
    let selected;


    async function addGolfPOI() {
        let newGolfPOI = {
            location: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            relatedImages: [],
            courseName: courseName,
            courseDesc: courseDesc,
            category: selected,
            lastUpdatedBy: $user._id
        }

        let success = await golfPOIService.createGolfPOI(newGolfPOI)
        if (success) {
            push("/courseReport");
        } else {
            errorMessage = "Could Not add new Golf POI";
        }
    }
</script>


<form on:submit|preventDefault={addGolfPOI}>
    <div class="uk-grid uk-grid-stack">
        <div class="uk-width-3-4@m">
            <div class="uk-margin">
                <div class="uk-form-label uk-text-left"><h2>Course Name</h2></div>
                <div class="uk-form-controls">
                    <input bind:value={courseName} class="uk-input" id="form-stacked-text" type="text" name="courseName" placeholder="name" />
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-form-label uk-text-left"><h2>Course Description</h2></div>
                <div class="uk-form-controls">
                    <input bind:value={courseDesc} class="uk-input" id="form-stacked-text" type="text" name="courseDesc" placeholder="desc" />
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-form-label uk-text-left"><h2>Latitude</h2></div>
                <div class="uk-form-controls">
                    <input bind:value={latitude} class="uk-input" id="form-stacked-text" type="decimal" name="latitude" placeholder="0.00" />
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-form-label uk-text-left"><h2>Longitude</h2></div>
                <div class="uk-form-controls">
                    <input bind:value={longitude} class="uk-input" id="form-stacked-text" type="decimal" name="longitude" placeholder="0.00" />
                </div>
            </div>
            <div class="uk-margin uk-text-left">
                <div>
                    <div class="uk-form-label"><h2>Province</h2></div>
                </div>
                <div class="uk-form-controls ">
                    {#each categories  as category}
                        <label><input bind:group={selected} value={category._id} class="uk-radio" type="radio" name="method"> {category.province} </label><br>
                    {/each}
                </div>
            </div>
        </div>
        <div class=" uk-width-1-4@m uk-position-center-right" >
            <div class="uk-margin">
                <button class="submit uk-button uk-button-primary uk-button-large uk-width-1-2">ADD</button>
            </div>
        </div>
    </div>
    {#if errorMessage}
        <div class="uk-text-left uk-text-small">
            {errorMessage}
        </div>
    {/if}
</form>