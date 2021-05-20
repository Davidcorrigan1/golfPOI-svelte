<script>
    import {user} from "../stores";
    import {push} from "svelte-spa-router";
    import {getContext, onMount} from "svelte";
    const golfPOIService = getContext("GolfPOIService");

    let errorMessage = "";
    let categories = []
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

        let response = await golfPOIService.createGolfPOI(newGolfPOI)
        if (response.success) {
            push("/courseReport");
        } else {
            errorMessage = response.message;
        }
    }

    onMount(async () => {
        categories = await golfPOIService.getCategoryList();
        selected = categories[0]._id;
    })
</script>


<form on:submit|preventDefault={addGolfPOI}>
    <div class="uk-grid uk-grid-stack">
        <div class="uk-width-3-4@m">
            <div class="uk-margin">
                <div class="uk-form-label uk-text-left"><h3>Course Name</h3></div>
                <div class="uk-form-controls">
                    <input bind:value={courseName} class="uk-input" id="form-stacked-text" type="text" name="courseName" placeholder="name" />
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-form-label uk-text-left"><h3>Course Description</h3></div>
                <div class="uk-form-controls">
                    <input bind:value={courseDesc} class="uk-input uk-form-large" rows= "5" type="text" name="courseDesc" placeholder="desc" />
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-form-label uk-text-left"><h3>Latitude</h3></div>
                <div class="uk-form-controls">
                    <input bind:value={latitude} class="uk-input" type="decimal" name="latitude" placeholder="0.00" />
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-form-label uk-text-left"><h3>Longitude</h3></div>
                <div class="uk-form-controls">
                    <input bind:value={longitude} class="uk-input" type="decimal" name="longitude" placeholder="0.00" />
                </div>
            </div>
            <div class="uk-margin uk-text-left">
                <div>
                    <div class="uk-form-label"><h3>Province</h3></div>
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
        <div class="uk-text-left uk-text-large">
            {errorMessage}
        </div>
    {/if}
</form>