<script>
    import Title from "./Title.svelte";
    import {navBar} from "../stores"
</script>

<div class="uk-container uk-margin-small">
    <Title/>
</div>
<div class="uk-margin uk-width-1xlarge uk-card uk-card-default uk-card-body uk-box-shadow-large">
    <div>
        <ul class="uk-iconnav uk-margin-left uk-margin-right uk-flex-center uk-flex-middle">
            {#each $navBar.bar as nav}
                {#if nav.count != ""}
                    <a href="{nav.link}" class="uk-card uk-card-small uk-card-hover uk-padding-small">
                        <span class="fa-stack-6x">
                            <span class="{nav.icon}"></span>
                            <strong class="fa-stack-1x" title={nav.title} pos="bottom" uk-tooltip>{nav.count}</strong>
                        </span>
                    </a>
                {:else }
                    <a href="{nav.link}" class="uk-card uk-card-small uk-card-hover uk-padding-small">
                        <i class="{nav.icon}" style="{nav.colour}" uk-tooltip="title: {nav.title}; pos:bottom"></i>
                    </a>
                {/if}
            {/each}
        </ul>
    </div>
</div>