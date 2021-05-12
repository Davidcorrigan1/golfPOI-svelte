<script>
    import { push } from "svelte-spa-router";
    import {getContext} from "svelte";
    const golfPOIService = getContext("GolfPOIService");

    let adminUserFlag = true;
    let selectedUser = 0;
    let adminUserType = ["Admin", "User"];

    let errorMessage = "";

    let newUser = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        adminUser: adminUserFlag,
        loginCount: 1,
        lastLoginDate: new Date().toISOString().slice(0,10)
    };

    async function signup() {
        if (selectedUser = 0) {
            adminUserFlag = true;
        } else {
            adminUserFlag = false
        }

        let success = await golfPOIService.signup(newUser)
        if (success) {
            push("/courseReport");
        } else {
            newUser.email = "";
            newUser.password = "";
            errorMessage = "Error signing up new User.";
        }
    }
</script>

<form on:submit|preventDefault={signup}>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: user"></span> <input bind:value={newUser.firstName} class="uk-input uk-form-large" type="text"
                                                                           name="firstName">
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: user"></span> <input bind:value={newUser.lastName} class="uk-input uk-form-large" type="text"
                                                                           name="lastName">
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: mail"></span> <input bind:value={newUser.email} class="uk-input uk-form-large" type="text"
                                                                           name="email">
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: lock"></span> <input bind:value={newUser.password} class="uk-input uk-form-large"
                                                                           type="password" name="password">
        </div>
    </div>
    <div class="uk-margin-small uk-flex-left uk-width-1-1">

        <div class="uk-form-label"><h4>User Type</h4></div>
        <div class="uk-form-controls uk-inline">
            <label><input bind:group={selectedUser} value={0} class="uk-radio" type="radio" name="method"> {adminUserType[0]} </label><br>
            <label><input bind:group={selectedUser} value={1} class="uk-radio" type="radio" name="method"> {adminUserType[1]} </label>
        </div>

    </div>
    <div class="uk-margin">
        <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Sign up</button>
    </div>
    <div class="uk-text-left uk-text-small"></div>
    {#if errorMessage}
        <div class="uk-text-left uk-text-small">
            {errorMessage}
        </div>
    {/if}
</form>
