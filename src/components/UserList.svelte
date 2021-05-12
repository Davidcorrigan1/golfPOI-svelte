<script>
    import {onMount, getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {userToDelete, courseCount} from "../stores";

    const golfPOIService = getContext("GolfPOIService");
    let errorMessage = "";
    let courseList;
    let userList = [];

    onMount(async () => {
        userList = await golfPOIService.getUserList();
        courseList = await golfPOIService.getCourseList();
        $courseCount = courseList.length;
    })

    async function deleteUser(userId) {
        let success = await golfPOIService.deleteUser(userId)
        if (success) {
            userList = await golfPOIService.getUserList();
            push("/userReport");
        } else {
            errorMessage = "Could not delete Golf POI";
        }
    }
</script>



<div class="uk-margin uk-width-1xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
    <table class="uk-table">
        <caption>
            <h3>List of Current Registered Users</h3>
        </caption>
        <thead>
            <th>Forename</th>
            <th>Surname</th>
            <th>Email Address</th>
            <th>Last Logged Date</th>
            <th>Logins</th>
            <th>Delete</th>
        </thead>
        <tbody class="uk-text-left">
            {#each userList as user}
            <tr>
                <td><a on:click={() => $userToDelete = user._id} href="/#/userUpdate" >{user.firstName}</a> </td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.lastLoginDate}</td>
                <td>{user.loginCount}</td>
                <td><button on:click={deleteUser(user._id)} class="uk-button-danger uk-button-primary uk-button-small uk-width-1-1">Delete</button></td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>