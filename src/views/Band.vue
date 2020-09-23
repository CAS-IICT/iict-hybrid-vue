<template>
    <div class="band">
        <Appbar title="手环" class="appbar"></Appbar>
        <mu-container class="box">
            <mu-form :model="form" class="mu-demo-form">
                <p>Scanning: {{ scanning }}</p>
                <p v-if="connectDevice">Connected: {{ connectDevice.name }}</p>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="scan">扫描手环</mu-button>
                    <mu-button color="primary" @click="disconnect">断开手环</mu-button>
                    <mu-button color="primary" @click="syncTime">同步时间(必须)</mu-button>
                </mu-form-item>
                <div v-if="sync">
                    <mu-form-item class="btn-box">
                        <mu-button color="primary" @click="checkConnectStatus">连接状态</mu-button>
                        <mu-button color="primary" @click="bandVersion">手环版本</mu-button>
                        <mu-button color="primary" @click="bandBattery">手环电量</mu-button>
                    </mu-form-item>
                    <mu-form-item class="btn-box">
                        <mu-button color="primary" @click="getTemp">测量体温</mu-button>
                        <mu-button color="primary" @click="syncStep">同步计步</mu-button>
                    </mu-form-item>
                    <div v-if="battery">电量：{{ battery }}</div>
                    <div v-if="version">版本：{{ version }}</div>
                    <div v-if="bodyTemp">体温：{{ bodyTemp }}</div>
                    <div v-if="step">计步：{{ step }}</div>
                    <div v-if="distance">距离：{{ distance }}</div>
                    <div v-if="calories">卡路里：{{ calories }}</div>
                </div>
                <mu-list>
                    <mu-list-item
                        button
                        :ripple="true"
                        v-for="(item, index) in bleList"
                        :key="index"
                        @click="connect(item)"
                    >
                        <mu-list-item-action>
                            <mu-icon class="iconfont" value=":iconshanfushouhuan"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>{{ item.name }}</mu-list-item-title>
                    </mu-list-item>
                </mu-list>
            </mu-form>
        </mu-container>
    </div>
</template>
<script>
import Appbar from '../components/Appbar'
import plus from '../plus.js'
import band from '../band.js'
export default {
    name: 'band',
    components: {
        Appbar: Appbar
    },
    data() {
        return {
            bleList: [],
            scanning: '',
            connectDevice: null,
            form: {},
            battery: null,
            version: null,
            bodyTemp: null,
            step: null,
            calories: null,
            distance: null,
            sync: false
        }
    },
    mounted() {
        this.checkConnectStatus()
        // 将扫描到的设备放入数组，不能重复
        plus.register('BandOnScanResult', res => {
            if (res.status == 1) {
                let data = res.data
                if (data.name && data.mac) {
                    for (let i in this.bleList) if (this.bleList[i].name == data.name) return (this.bleList[i] = data)
                    this.bleList.push(data)
                }
            }
        })
        // 监听扫描结束
        plus.register('BandFinishScan', res => {
            this.scanning = ''
        })
        // 监听连接
        plus.register('OnBandConnected', res => {
            this.checkConnectStatus()
            this.scanning = ''
        })
        // 监听断开连接
        plus.register('OnBandDisconnected', res => {
            this.checkConnectStatus()
            this.scanning = ''
        })
        // 监听体温
        plus.register('BandTestTemperature', res => {
            this.bodyTemp = res.data.bodyTemperature
            console.log(res)
        })
        plus.register('BandSampleTemperature', res => {
            this.bodyTemp = res.data.bodyTemperature
            console.log(res)
        })
        // 步数变化
        plus.register('OnBandStepChange', res => {
            this.step = res.data.step
            this.distance = res.data.distance
            this.calories = res.data.calories
        })
    },
    methods: {
        scan() {
            this.bleList = []
            band.scanBand(3000).then(res => {
                this.scanning = 'scanning...'
                console.log(res)
            })
        },
        connect(item) {
            band.connectBand(item).then(res => {
                console.log(res)
                if (!res.status) return plus.toast(res.msg)
                this.scanning = 'connecting...'
            })
        },
        disconnect() {
            band.disconnectBand().then(res => {
                console.log(res)
            })
        },
        checkConnectStatus() {
            band.checkBand().then(res => {
                if (res.status) (this.connectDevice = res.data), plus.toast('连上了：' + this.connectDevice.name)
                else (this.connectDevice = null), plus.toast('无手环：' + res.msg)
            })
        },
        bandVersion() {
            band.getBandVersion().then(res => {
                if (!res.status) return plus.toast(res.msg)
                this.version = res.data
            })
        },
        bandBattery() {
            band.getBandBattery().then(res => {
                if (!res.status) return plus.toast(res.msg)
                this.battery = res.data
            })
        },
        getTemp() {
            band.getBodyTemperature().then(res => {
                if (!res.status) return plus.toast(res.msg)
                console.log(res)
            })
        },
        syncStep() {
            band.syncStep().then(res => {
                console.log(res)
                return plus.toast(res.msg)
            })
        },
        syncTime() {
            band.syncTime().then(res => {
                console.log(res)
                if (res.status == 1) this.sync = true
                return plus.toast(res.msg)
            })
        }
    }
}
</script>
<style scoped>
.appbar {
    position: fixed;
    top: 0;
    opacity: 1;
    z-index: 999;
    width: 100%;
}
.box {
    padding: 20% 5%;
}
</style>
