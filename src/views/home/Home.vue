<template>
    <div class="home">
        <tips></tips>
        <!-- <button @click="scan">scan</button> -->
        <radar class="radar"></radar>
        <localtip class="localtip"></localtip>
    </div>
</template>
<script>
import Tips from '../../components/Tips'
import Radar from '../../components/Radar'
import Localtip from '../../components/Localtip'
import $ from '../../tool.js'
import plus from '../../plus.js'
export default {
    name: 'Home',
    components: { [Radar.name]: Radar, Tips: Tips, Localtip: Localtip },
    methods: {
        // scan() {
        //     plus.scan(true)
        // }
    }
}
</script>
<style scoped>
.home {
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    padding-top: 56px;
    padding-bottom: 56px;
}

.radar {
    margin-top: 7vh;
}
.localtip {
    position: absolute;
    right: 3px;
    bottom: 58px;
}
</style>
