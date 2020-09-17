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
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="bandVersion">手环版本</mu-button>
                    <mu-button color="primary" @click="bandBattery">手环电量</mu-button>
                </mu-form-item>
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
            form: {}
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
            console.log(res)
            this.scanning = ''
        })
        // 监听连接
        plus.register('OnBandConnected', res => {
            console.log(res)
            this.checkConnectStatus()
            this.scanning = ''
        })
        // 监听断开连接
        plus.register('OnBandDisconnected', res => {
            console.log(res)
            this.checkConnectStatus()
            this.scanning = ''
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
                console.log(res)
                if (res.status) this.connectDevice = res.data
                else this.connectDevice = null
            })
        },
        bandVersion() {
            band.getBandVersion().then(res => {
                console.log(res)
            })
        },
        bandBattery() {
            band.getBandBattery().then(res => {
                console.log(res)
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
