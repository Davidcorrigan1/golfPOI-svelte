<script>
    import golfBall from "/src/assets/golf-ball-symbol.jpg"
    import titleCourse from "/src/assets/Ballybunion-Golf-Club-Old-Course.jpg"
    import {title, subTitle} from "../stores.js"
</script>

<div class="uk-card uk-card-default uk-padding-small uk-visible@m">
    <div class="uk-grid">
        <div class="uk-width-1-6@m">
            <img src="{golfBall}" width="100" alt="img" />
        </div>
        <div class="uk-width-expand@m uk-text-large">
            <div class="title">
                <h2>{$title}</h2>
            </div>
            <div class="uk-text-muted uk-text-small">
                <h3>{$subTitle}</h3>
            </div>
        </div>
        <div class="uk-width-auto@m">
            <img width="300" src="{titleCourse}" />
        </div>
    </div>
</div>