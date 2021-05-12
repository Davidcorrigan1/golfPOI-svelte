<script>
    import {onMount, getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {navBar, currentCourse, courseCount} from "../stores";

    const golfPOIService = getContext("GolfPOIService");
    let errorMessage = "";
    let courseList;

    async function deleteCourse(courseId) {
        let success = await golfPOIService.deleteGolfPOI(courseId)
        if (success) {
            courseList = await golfPOIService.getCourseList();
            push("/courseReport");
        } else {
            errorMessage = "Could not delete Golf POI";
        }
    }

    onMount(async () => {
        courseList = await golfPOIService.getCourseList();
        $courseCount = courseList.length;
        $navBar.bar[4].count = $courseCount;
    })

</script>

<div class="uk-margin uk-width-1xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
    <table class="uk-table">

        <thead>
        <th>Course Name</th>
        <th>Course Description</th>
        <th>Province</th>
        <th>Updated By</th>
        <th>Add Image</th>
        <th>Delete</th>
        </thead>
        <tbody class="uk-text-left">
        {#if courseList}
            {#each courseList as course}
            <tr>
                <td><a on:click={() => $currentCourse = course } href="/#/updateCourse"> {course.courseName}</a></td>
                <td>{course.courseDesc}</td>
                <td>{course.category.province}</td>
                <td>{course.lastUpdatedBy.firstName} {course.lastUpdatedBy.lastName}</td>
                <td>Image</td>
                <td><button on:click={deleteCourse(course._id)} class="uk-button-danger uk-button-primary uk-button-small uk-width-1-1">Delete</button></td>
            </tr>
            {/each}
        {/if}
        </tbody>
    </table>
</div>
{#if errorMessage}
    <div class="uk-text-left uk-text-small">
        {errorMessage}
    </div>
{/if}