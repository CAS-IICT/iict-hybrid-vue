<template>
    <div class="home">
        <div class="tips">
            <div class="moveleft">
                <div>
                    <i class="iconfont icontiwenji"></i>
                    &nbsp;
                    <span>体温</span>
                </div>
                <div>
                    <i class="iconfont iconbushu"></i>
                    &nbsp;
                    <span>计步</span>
                    <span></span>
                </div>
            </div>
            <div class="moveright">
                <div>
                    <i class="iconfont iconkongqiwendu"></i>
                    &nbsp;
                    <span>{{ temp }}&#8451;气温</span>
                </div>
                <div>
                    <i class="iconfont iconIOTtubiao_huabanfuben"></i>
                    &nbsp;
                    <span>{{ humidity }}%湿度</span>
                </div>
            </div>
        </div>
        <!-- <button @click="scan">scan</button> -->
        <radar class="radar"></radar>
        <div class="localtip">
            <div class="icon" v-show="loc">
                <i class="iconfont iconlocation"></i>
                &nbsp;
                <span class="loacl">{{ loc }}</span>
            </div>
        </div>
    </div>
</template>
<script>
// import Tips from '../../components/Tips'
import Radar from '../../components/Radar'
// import Localtip from '../../components/Localtip'
import $ from '../../tool.js'
import plus from '../../plus'
export default {
    name: 'Home',
    components: { [Radar.name]: Radar },
    data() {
        return {
            weather: {},
            loc: '',
            temp: '',
            humidity: ''
        }
    },
    async mounted() {
        this.loc = (await plus.getLoc()).data.city
        console.log(this.loc)
        this.weather = (await plus.getWeather(this.loc)).data
        this.temp = this.weather.temp
        console.log(this.temp)
        this.humidity = this.weather.humidity
        console.log(this.humidity)
    },
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
.tips {
    position: relative;
    height: 1.6rem;
    width: 100%;
}
.appbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
}
.radar {
    position: relative;
    height: 9rem;
    margin-top: 7vh;
}
.localtip {
    position: absolute;
    right: 3px;
    bottom: 58px;
}
.moveleft {
    position: absolute;
    top: 6px;
    left: 6px;
}
.moveright {
    position: absolute;
    top: 6px;
    right: 6px;
}
.icon {
    /* position: absolute; */
    text-align: center;
    float: right;
    right: 1rem;
}
.iconfont {
    font-size: 0.45rem;
}
</style>
