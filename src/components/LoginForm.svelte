<script>
    import { push } from "svelte-spa-router";
    import {getContext} from "svelte";
    import {user} from "../Stores";
    const golfPOIService = getContext("GolfPOIService");

    let email = ""
    let password = "";
    let errorMessage = "";

    async function login() {
        let response = await golfPOIService.login(email, password)
        if (response.success) {
            let loginUser = await golfPOIService.getUserByEmail(email)
            if (loginUser) {
                user.set(loginUser);
                loginUser.loginCount += 1;
                loginUser.lastLoginDate = new Date().toISOString().slice(0, 10);
                await golfPOIService.updateUser(loginUser._id, loginUser);
                push("/courseReport");
            } else {
                email = "";
                password = "";
                errorMessage = "Invalid Credentials";
                push("/login");
            }
        } else {
            email = "";
            password = "";
            errorMessage = "Invalid Credentials";
            push("/login");
        }
    }
</script>

<form on:submit|preventDefault={login}>
    <div class="uk-margin uk-text-left">
        <label class="uk-form-label" for="form-stacked-text">Email</label>
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: mail"></span> <input bind:value={email} class="uk-input uk-form-large" type="text"
                                                                           name="email">
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: lock"></span> <input bind:value={password} class="uk-input uk-form-large"
                                                                           type="password" name="password">
        </div>
    </div>
    <div class="uk-margin">
        <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Login</button>
    </div>
    <div class="uk-text-left uk-text-small"></div>
    {#if errorMessage}
        <div class="uk-text-left uk-text-small">
            {errorMessage}
        </div>
    {/if}
</form>


