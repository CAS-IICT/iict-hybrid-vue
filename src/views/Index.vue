<template>
    <div class="index">
        <h1>IICT Hybrid Vue</h1>
        <button @click="test(true)">open</button>
        <button @click="test(false)">close</button>
    </div>
</template>
<script>
import plus from '../plus.js'
export default {
    name: 'Index',
    data(){
        return {
        }
    },
    mounted(){
    },
    methods:{
        test(){
            plus.alert('test','test','confirm')
        }
    }
}
</script>
<style scoped>
</style>
