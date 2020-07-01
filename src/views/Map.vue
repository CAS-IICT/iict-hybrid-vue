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
                    <mu-button color="primary" @click="setMap()">设置地图</mu-button>
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
    mounted() {},
    methods: {
        async zoomMap(size) {
            plus.zoomMap(size)
        },
        async moveCenter() {
            plus.moveMapCenter()
        },
        async setMap() {
            plus.setMap(this.map)
        }
    }
}
</script>
<style scoped></style>
