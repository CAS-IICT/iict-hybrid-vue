<template>
    <div class="home">
        <h2>主页</h2>
        <button @click="scan">scan</button>
    </div>
</template>
<script>
import $ from '../../tool.js'
import plus from '../../plus.js'
export default {
    name: 'Home',
    methods: {
        scan() {
            plus.scan(true)
        }
    }
}
</script>
<style scoped></style>
