<script>
    import {user} from "../stores";
    import { push, replace } from "svelte-spa-router";
    import {getContext, onMount} from "svelte";
    const golfPOIService = getContext("GolfPOIService");

    let validCounties=""
    let province="";
    let errorMessage = ""
    let categoryList=[];

    async function deleteCategory(categoryId) {
        let success = await golfPOIService.deleteCategory(categoryId)
        if (success) {
            categoryList = await golfPOIService.getCategoryList();
            await push("/addCategory");
        } else {
            errorMessage = "Could not delete Category";
        }
    }

    async function addCategory() {
        const validCountiesArray = validCounties.split(' ');
        if (province !== "" && validCounties !== "") {
            let newCategory = {
                validCounties: validCountiesArray,
                province: province,
                lastUpdatedBy: $user._id
            }

            let success = await golfPOIService.createCategory(newCategory)
            if (success) {
                validCounties = "";
                province = "";
                categoryList = await golfPOIService.getCategoryList();
                await push("/addCategory");
            } else {
                errorMessage = "Could Not add new Category";
            }
        } else {
            errorMessage = "Please enter both province and list of counties";
        }
    }

    onMount(async () => {
        categoryList = await golfPOIService.getCategoryList();
    })
</script>


<form class="uk-form-stacked uk-text-left" on:submit|preventDefault={addCategory}>
    <div class="uk-grid uk-grid-stack">
        <div class="uk-width-3-4@m">
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Enter Province Name</label>
                <div class="uk-form-controls">
                    <input bind:value={province} class="uk-input" id="form-stacked-text" type="text" name="province" placeholder="Province" />
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Enter a Valid List of Province Counties</label>
                <div class="uk-form-controls">
                    <input bind:value={validCounties} class="uk-input" id="form-stacked-text" type="text" name="validCounties" placeholder="Counties in Province" />
                </div>
            </div>
            <div class=" uk-width-1-4@m uk-position-center-centre" >
                <div class="uk-margin">
                    <button class="submit uk-button uk-button-primary uk-button-large uk-width-1-2">ADD</button>
                </div>
            </div>
            <br><br><br>
            {#if errorMessage}
                <div class="uk-text-left uk-text-small">
                    {errorMessage}
                </div>
            {/if}
        </div>

    </div>
</form>

<div class="uk-margin uk-width-1xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
    <table class="uk-table">
        <caption>
            <h3>Current Category Entries</h3>
        </caption>
        <thead>
        <th>Province Name</th>
        <th>List of Valid Counties</th>
        <th>Updated By</th>
        <th>Delete</th>
        </thead>
        <tbody class="uk-text-left">
        {#each categoryList as category}
            <tr>
                <td>{category.province}</td>
                <td>{category.validCounties}</td>
                <td>{category.lastUpdatedBy.firstName} {category.lastUpdatedBy.lastName}</td>
                <td><button on:click={deleteCategory(category._id)} class="uk-button-danger uk-button-primary uk-button-small uk-width-1-1">Delete</button></td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>