<script>
    import {onMount, getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {currentCourse, user} from "../Stores";

    const golfPOIService = getContext("GolfPOIService");

    export let imageCourse={};
    export let currentUser={};

    let errorMessage = ""
    let fileInput;
    let imageFile;
    let images=[];
    let currentGolfPOI;
    let files;

    const onFileSelected = async (e)=>{
        let image = e.target.files[0];
        let reader = new FileReader();
        await reader.readAsDataURL(image);
        reader.onload = e => {
            imageFile = e.target.result
        };
        let updateCourse = await golfPOIService.getCourse(imageCourse._id);
        if (Object.keys(imageFile).length > 0) {
            const result = await golfPOIService.uploadImage(imageFile);
            updateCourse.relatedImages.push(result.public_id);
            let success = await golfPOIService.updateGolfPOI(imageCourse._id, currentUser._id, updateCourse)
            if (success) {
                $currentCourse = updateCourse;
                push("/addImage");
            } else {
                errorMessage = "Could Add Delete Image";
            }
        }
    }

    async function addImage(image) {
        try {
            let updateCourse = await golfPOIService.getCourse(imageCourse._id);
            if (Object.keys(image).length > 0) {
                console.log(image.length);
                const result = await golfPOIService.uploadImage(image);
                updateCourse.relatedImages.push(result.public_id);
                let success = await golfPOIService.updateGolfPOI(imageCourse._id, $user._id, updateCourse)
                if (success) {
                    $currentCourse = updateCourse;
                    push("/addImage");
                } else {
                    errorMessage = "Could Add Delete Image";
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
</script>


<div class="uk-card-small uk-card-default uk-card-body">
    <h3 class="uk-card-title">Image Upload for {imageCourse.courseName}</h3>

    <form on:submit|preventDefault={addImage(imageFile)} class="uk-form-horizontal" enctype="multipart/form-data">
        <div class="uk-margin">
            <label class="uk-form-label" for="form-horizontal-text">Select Image</label>
            <div class="uk-form-controls">
                <input bind:value={imageFile} type="file" class="uk-input" name="imageFile" accept="image/png, image/jpeg">
            </div>
            <div>
                <input type="submit" value="Upload" class="uk-button uk-button-default">
            </div>
        </div>
    </form>
</div>
