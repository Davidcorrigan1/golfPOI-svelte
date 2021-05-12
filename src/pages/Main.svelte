<script>
    import mainPage from "/src/assets/mainPage.jpg"
    import {title, subTitle, navBar, welcomeBar} from "../stores"
    import {getContext, onMount} from "svelte";

    const golfPOIService = getContext("GolfPOIService");

    title.set("Golf Courses of Ireland");
    subTitle.set("Please sign up or login");

    navBar.set({
        bar: welcomeBar
    });

    onMount(async () => {
        await golfPOIService.logout();
    })


</script>

<div class="uk-container uk-margin">
    <div class="uk-child-width-expand uk-flex-center uk-flex-left uk-text-left" uk-grid>
        <div class="uk-width-auto@m">
            <img width="300" src="{mainPage}" />
        </div>
        <div class="uk-width-expand@m">
            <h1 class="uk-heading-small">Golf Courses of Ireland</h1>
            <p>A comprehensive list of Irish Golf Course information </p>
            <p>Ireland has an abundance of beautiful and high quality golf course. Some are world renowned and people travel
                from all over the world to play these course.</p>
            <p>This site aims to provide a comprehensive guide to some of the best courses from around the country. Later
                releases will allow these courses to be rated, so that players have the latest feedback from the top courses
                around the country.</p>
        </div>
    </div>
</div>