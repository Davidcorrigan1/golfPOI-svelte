<script>
    import {onMount, getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {currentCourse, user} from "../Stores";

    const golfPOIService = getContext("GolfPOIService");

    export let imageCourse={};

    let errorMessage = ""
    let images=[];
    let currentGolfPOI;
    let files;

    async function addImage() {

    }
</script>


<div class="uk-card-small uk-card-default uk-card-body">
    <h3 class="uk-card-title">Image Upload for {imageCourse.courseName}</h3>

    <form on:submit|preventDefault={addImage} class="uk-form-horizontal" enctype="multipart/form-data">
        <div class="uk-margin">
            <label class="uk-form-label" for="form-horizontal-text">Select Image</label>
            <div class="uk-form-controls">
                <input type="file" bind:files={files} class="uk-input" name="imagefile" accept="image/png, image/jpeg">
            </div>
            <div>
                <input type="submit" value="Upload" class="uk-button uk-button-default">
            </div>
        </div>
    </form>
</div>
