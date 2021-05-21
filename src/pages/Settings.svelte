<script>
    import settingsPageImage from "/src/assets/golfcourse1.jpg";
    import SettingsForm from "../components/SettingsForm.svelte";
    import {user, adminBar, navBar, mainBar, subTitle, title, courseCount} from "../Stores";

    let navigation;
    if ($user.adminUser === true) {
        navigation = adminBar;
        navigation[4].count = $courseCount.toString();
    } else {
        navigation = mainBar;
    }
    title.set("Golf Courses of Ireland");
    subTitle.set("Update your User settings here");
    navBar.set({
        bar: navigation
    });
</script>

<div class="uk-container uk-margin">
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
        <div>
            <img width="800" src="{settingsPageImage}">
        </div>
        <div>
            <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large">
                <h3 class="uk-card-title uk-text-center">Update Your Information here!</h3>
                <SettingsForm updateUser={$user}/>
            </div>
        </div>

    </div>
</div>