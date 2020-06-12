<template>
    <div class="home">
        <tips></tips>
        <!-- <button @click="scan">scan</button> -->
        <radar></radar>
        <div class="icon">
            <i class="iconfont iconlocation"></i>
            <div class="loacl">定位位置</div>
        </div>
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
<style scoped>
.icon {
    position: absolute;
    text-align: center;
    width: 90px;
    height: 90px;
    right: 0;
}
.iconfont {
    font-size: 40px;
}
</style>
