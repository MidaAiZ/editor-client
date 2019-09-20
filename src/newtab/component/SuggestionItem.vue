<template>
    <div class="suggestion-item">
        <div>
            <img src="https://picsum.photos/150/150"
                 class="item-img"/>
        </div>
        <div class="item-name">天猫精选</div>
    </div>
</template>
<script>

    export default {
        name: 'suggestions',
    }
</script>
<style scoped>
    .suggestion-item{
        display: inline-block;
        margin-bottom: 25px;
        padding: 0 50px 30px 50px;
    }
    .item-img{
        width:90px;
        height: 90px;
        border-radius: 50%;
    }
    .item-name{
        text-align: center;
        font-size:15px;
        padding-top: 20px;
        width: 100%;
    }
</style>