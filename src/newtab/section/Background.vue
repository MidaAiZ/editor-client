<template>
    <div id="background">
        <img :src="imgUrl"/>
    </div>
</template>
<script>

export default {
    name: 'background',
    data(){
        return{
            imgUrl: ''
        }
    }
}
</script>
<style scoped>
    #background{
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
    }
</style>