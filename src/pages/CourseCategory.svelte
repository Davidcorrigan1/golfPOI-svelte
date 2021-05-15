<script>
    import CourseList from "../components/CourseList.svelte";
    import {user, adminBar, navBar, mainBar, subTitle, title, courseCount, currentCategoryId} from "../stores";
    import {getContext, onMount} from "svelte";
    const golfPOIService = getContext("GolfPOIService");

    let navigation;
    let courseListArray = [];

    title.set("Golf Courses of Ireland");
    subTitle.set("List of Added courses to date");

    if ($user.adminUser === true) {
        navigation = adminBar;
        navigation[4].count = $courseCount;
    } else {
        navigation = mainBar;
    }
    navBar.set({
        bar: navigation
    });


    onMount(async () => {
        courseListArray = await golfPOIService.getCoursesByCategory($currentCategoryId);
    })
</script>

<div class="uk-container uk-margin-small">
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center " uk-grid>
        <div class="uk-width-expand@m">
            <CourseList courseList={courseListArray}/>
        </div>
    </div>
</div>