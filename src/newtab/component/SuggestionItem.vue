<template>
    <div class="suggestion-item" :style="width">
        <div class="item-img-container">
            <img src="https://picsum.photos/150/150"
                 class="item-img"/>
        </div>
        <div class="item-name">天猫精选</div>
    </div>
</template>
<script>

    export default {
        name: 'suggestions',
        props: ['itemNumber'],
        computed:{
            width:function () {
                return{
                    'width': 100/this.itemNumber+'%'
                }
            }
        }
    }
</script>
<style scoped>
    .suggestion-item{
        display: inline-block;
        margin-bottom: 20px;
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
    .item-img-container{
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>