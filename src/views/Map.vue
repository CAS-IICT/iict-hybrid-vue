<template>
    <div class="map">
        <mu-container class="loginBox">
            <mu-form :model="map" class="mu-demo-form">
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="moveCenter()">移到中心</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <input type="number" v-model="size" />
                    <mu-button color="primary" @click="zoomMap(size)">缩放地图</mu-button>
                </mu-form-item>
                <mu-form-item prop="width" label="width">
                    <mu-text-field v-model="map.width" type="number"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="height" label="height">
                    <mu-text-field v-model="map.height" type="number"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="top" label="top">
                    <mu-text-field v-model="map.top" type="number"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="bottom" label="bottom">
                    <mu-text-field v-model="map.bottom" type="number"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="left" label="left">
                    <mu-text-field v-model="map.left" type="number"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="right" label="right">
                    <mu-text-field v-model="map.right" type="number"></mu-text-field>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="setMap('visible')">设置地图</mu-button>
                    <mu-button color="primary" @click="setMap('gone')">关闭地图地图</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-text-field v-model="longitude" type="number"></mu-text-field>
                    <mu-text-field v-model="latitude" type="number"></mu-text-field>
                    <mu-button color="primary" @click="markMap()">添加标记</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-container>
    </div>
</template>
<script>
import plus from '../plus.js'
export default {
    name: 'Map',
    data() {
        return {
            size: '15',
            latitude: 0,
            longitude: 0,
            map: {
                show: 'visible',
                width: 999999,
                height: 800,
                top: 0,
                left: 0,
                right: 0
            },
            form: {}
        }
    },
    async mounted() {},
    methods: {
        async zoomMap(size) {
            plus.zoomMap(size)
        },
        async moveCenter() {
            plus.moveMapCenter()
        },
        async setMap(show = 'visible') {
            this.map.show = show
            const res = await plus.getLoc()
            this.longitude = res.data.longitude
            this.latitude = res.data.latitude
            plus.setMap(this.map)
        },
        async markMap() {
            const res = await plus.getLoc()
            plus.markMap({
                latitude: this.latitude || res.data.latitude,
                longitude: this.longitude || res.data.longitude,
                icon:
                    'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACLElEQVRoQ+1YvU8bMRT/PftomFiQQAwVZSCR2qEjG0ggIAMbiJGVhRn4G5i7dO1YwcbAh0CC/4ABGBgAMSCokBATac82MuFCROOL8X0kQfZyl8h+/n08Pz8dTc7MDouQfhAwBQAK2OGBWtrd3DjTv9t90Hh5bjsCH4HVJPa31qfbHbzGRxPlOdUI6N7WOnU6AawWi1gpldqaR5wDH5eAGpSgSxbrjM2cNKx1ciBcqCD4VYjd32ZOSwhoZSNwJhfE7F/IrwLshINvfEoDpzHGux3Q4KP0MLkgvwmoXgn6w8BOeWsJLI8Uob5IqCEBNSChel+rLt0R6JqBzjnogoHuXypvtwIeCYieGVKwckCng04L09BpotOlFcOKgAZmImECr4Yk5GfxzIldcdB5fNVyJW9NQG8QLlag+mRtL7plCH6aq5E+L3o0q1iu4Ju1Ev9dZP+WH4GCAjsIIMdCoELoWus27q8P+/MmTe6MXAiofgn5XYAfBrUDKkZDsCMOuskmPWyIWaeQJtAI6Nv/81C9npg1ARs16g96XpUpMYG3PY+Yr5Zb/jvbGzgSNDGB+p5H9SjQQ/Uyq3+3cc91TiICefY8JoKJCNR6njsGdtzmN3FDBXLseTJxwDVv01yXKIXSBOIayxNwVS6tdd6BtJR0jeMdcFUurXUf+ttox3/c9QTSyvO4OP4M5KGyd6DVKnsHvAMZKuDLaIbiWoX2DljJlOEk70CG4lqF7ngHngDVlIWYfOINWgAAAABJRU5ErkJggg==',
                title: 'test',
                desc: 'test'
            })
        }
    }
}
</script>
<style scoped></style>
