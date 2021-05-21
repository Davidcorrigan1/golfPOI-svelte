<script>
    import {title, subTitle, navBar, welcomeBar} from "../Stores"
    import SignupForm from "../components/SignupForm.svelte"
    import mainPageImage from "/src/assets/main page image.jpg";
    title.set("Golf Courses of Ireland");
    subTitle.set("Login to your account here");

    navBar.set({
        bar: welcomeBar
    });
</script>

<div class="uk-container uk-margin">
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
        <div>
            <img width="800" src="{mainPageImage}">
        </div>
        <div>
            <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large">
                <h3 class="uk-card-title uk-text-center">Welcome back!</h3>
                <SignupForm />
            </div>
        </div>

    </div>
</div>