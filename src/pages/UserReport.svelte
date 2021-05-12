<script>
    import UserList from "../components/UserList.svelte";
    import {user, adminBar, navBar, mainBar, subTitle, title, courseCount} from "../stores";
    import {getContext, onMount} from "svelte";
    const golfPOIService = getContext("GolfPOIService");

    let navigation;
    let courseList = [];
    if ($user.adminUser === true) {
        navigation = adminBar;
        navigation[4].count = $courseCount.toString();
    } else {
        navigation = mainBar;
    }

    title.set("Golf Courses of Ireland");
    subTitle.set("List of System Users");
    navBar.set({
        bar: navigation
    });

    onMount(async () => {
        courseList = await golfPOIService.getCourseList();
        $courseCount = courseList.length;
    })
</script>

<div class="uk-container uk-margin-small">
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center " uk-grid>
        <div class="uk-width-expand@m">
            <UserList/>
        </div>
    </div>
</div>