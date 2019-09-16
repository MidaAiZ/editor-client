<template>
    <div class="bar-web-search-wrap">
        <input class="bar-web-search" />
        <i></i>
    </div>
</template>
<script>

export default {
    name: 'barSearch',
}
</script>
<style scoped>
    .bar-web-search-wrap {
        width: 100%;
        padding-left: 5%;
        padding-right: 5%;
        margin-top: -10px;
    }
    .bar-web-search {
        width: 75%;
        height: 40px;
        border-radius: 40px;
        border: 0;
        background-color: #efefef;
        outline: 0;
        padding-left: 20px;
    }
</style>