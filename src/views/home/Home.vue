<template>
    <div class="home">
        <tips></tips>
        <!-- <button @click="scan">scan</button> -->
        <radar></radar>
    </div>
</template>
<script>
import Tips from '../../components/Tips'
import Radar from '../../components/Radar'
import $ from '../../tool.js'
import plus from '../../plus.js'
export default {
    name: 'Home',
    components: { [Radar.name]: Radar, Tips: Tips },
    methods: {
        // scan() {
        //     plus.scan(true)
        // }
    }
}
</script>
<style scoped></style>
