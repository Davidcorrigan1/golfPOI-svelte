<script>
    import {onMount, getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {currentCourse, user} from "../Stores";

    const golfPOIService = getContext("GolfPOIService");

    export let imageCourse={};
    export let currentUser={};

    let errorMessage = ""
    let imagefile;
    let files;

    async function addImage(files) {
        try {
            let updateCourse = await golfPOIService.getCourse(imageCourse._id);

            let ifile = files[0];

            let reader = new FileReader();
            reader.onload = async function(e) {
                imagefile = e.target.result;
                let result = await golfPOIService.uploadImage(imageCourse._id, imagefile);
                updateCourse = await golfPOIService.getCourse(imageCourse._id);
                if (result) {
                    $currentCourse = updateCourse;
                    push("/courseReport");
                } else {
                    errorMessage = "Could Add Delete Image";
                }
            };
            reader.readAsDataURL(ifile);

        } catch (err) {
            console.log(err);
        }
    }
</script>


<div class="uk-card-small uk-card-default uk-card-body">
    <h3 class="uk-card-title">Image Upload for {imageCourse.courseName}</h3>

    <form on:submit|preventDefault={addImage(files)} class="uk-form-horizontal" enctype="multipart/form-data">
        <div class="uk-margin">
            <label class="uk-form-label" for="form-horizontal-text">Select Image</label>
            <div class="uk-form-controls">
                <input bind:files={files} type="file" class="uk-input" name="imageFile" accept="image/png, image/jpeg">
            </div>
            <div>
                <input type="submit" value="Upload" class="uk-button uk-button-default">
            </div>
        </div>
    </form>
</div>
