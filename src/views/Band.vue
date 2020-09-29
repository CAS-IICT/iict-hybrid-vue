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
                    <mu-button color="primary" @click="unlock">强制解锁</mu-button>
                    <mu-button color="primary" @click="syncTime">同步时间(必须)</mu-button>
                </mu-form-item>
                <div v-if="sync">
                    <mu-form-item class="btn-box">
                        <mu-button color="primary" @click="checkConnectStatus">连接状态</mu-button>
                        <mu-button color="primary" @click="bandVersion">手环版本</mu-button>
                        <mu-button color="primary" @click="bandBattery">手环电量</mu-button>
                    </mu-form-item>
                    <mu-form-item class="btn-box">
                        <mu-button color="primary" @click="temperatureStatus()">测状态</mu-button>
                        <mu-button color="primary" @click="getTemp">测体温</mu-button>
                        <mu-button color="primary" @click="testRate">测心率</mu-button>
                        <mu-button color="primary" @click="testBloodPressure">测血压</mu-button>
                    </mu-form-item>
                    <mu-form-item class="btn-box">
                        <mu-button color="primary" @click="syncTemp">同步体温</mu-button>
                        <mu-button color="primary" @click="syncStep">同步计步</mu-button>
                        <mu-button color="primary" @click="syncSleep">同步睡眠</mu-button>
                        <mu-button color="primary" @click="syncRate">同步心率</mu-button>
                        <mu-button color="primary" @click="syncBloodPressure">同步血压</mu-button>
                    </mu-form-item>
                    <mu-form-item class="btn-box">
                        <mu-button color="primary" @click="queryStepDate">查询今天步数</mu-button>
                        <mu-button color="primary" @click="queryStepInfo">查询今天步数（详细）</mu-button>
                        <mu-button color="primary" @click="querySleepDate">查询今天睡眠</mu-button>
                        <mu-button color="primary" @click="querySleepInfo">查询今天睡眠（详细）</mu-button>
                        <mu-button color="primary" @click="queryRateDate">查询今天心率</mu-button>
                        <mu-button color="primary" @click="queryRateInfo">查询今天心率（详细）</mu-button>
                        <mu-button color="primary" @click="queryBloodPressureDate">查询今天血压</mu-button>
                    </mu-form-item>
                    <div v-if="battery">电量：{{ battery }}</div>
                    <div v-if="version">版本：{{ version }}</div>
                    <div v-if="bodyTemp">体温：{{ bodyTemp }}</div>
                    <div v-if="step">计步：{{ step }}</div>
                    <div v-if="distance">距离：{{ distance }}</div>
                    <div v-if="calories">卡路里：{{ calories }}</div>
                    <div v-if="rate">心率：{{ rate }}</div>
                    <div v-if="bloodPressure">血压：{{ bloodPressure }}</div>
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
            rate: null,
            bloodPressure: null,
            sync: false
        }
    },
    mounted() {
        this.checkConnectStatus()
    },
    methods: {
        scan() {
            this.bleList = []
            band.scanBand(
                3000,
                res => {
                    if (res.status == 1) {
                        this.scanning = 'scanning...'
                        let data = res.data
                        if (data.name && data.mac) {
                            for (let i in this.bleList)
                                if (this.bleList[i].name == data.name) return (this.bleList[i] = data)
                            this.bleList.push(data)
                        }
                    } else plus.toast(res.msg)
                },
                () => {
                    this.scanning = ''
                }
            )
        },
        connect(item) {
            this.scanning = 'connecting...'
            band.connectBand(
                item,
                () => {
                    this.scanning = 'connected'
                    band.checkBand(res => {
                        this.connectDevice = res.data
                    })
                },
                () => {
                    this.scanning = 'disconnected'
                    this.connectDevice = null
                }
            )
        },
        disconnect() {
            band.disconnectBand(res => {
                this.connectDevice = res.data
                this.scanning = 'disconnected'
            })
        },
        checkConnectStatus() {
            band.checkBand(res => {
                if (res.status) (this.connectDevice = res.data), plus.toast('连上了：' + this.connectDevice.name)
                else (this.connectDevice = null), plus.toast('无手环：' + res.msg)
            })
        },
        bandVersion() {
            band.getBandVersion(res => {
                if (!res.status) return plus.toast(res.msg)
                this.version = res.data
            })
        },
        bandBattery() {
            band.getBandBattery(res => {
                if (!res.status) return plus.toast(res.msg)
                this.battery = res.data
            })
        },
        getTemp() {
            band.getBodyTemperature(res => {
                if (!res.status) return plus.toast(res.msg)
                this.bodyTemp = res.data.bodyTemperature
            })
        },
        syncStep() {
            band.syncStep(
                res => {
                    console.log(res)
                    return plus.toast(res.msg)
                },
                res => {
                    this.step = res.data.step
                    this.distance = res.data.distance
                    this.calories = res.data.calories
                }
            )
        },
        syncTime() {
            band.syncTime(res => {
                console.log(res)
                if (res.status == 1) this.sync = true
                return plus.toast(res.msg)
            })
        },
        syncSleep() {
            band.syncSleep(res => {
                console.log(res)
                return plus.toast(res.msg)
            })
        },
        temperatureStatus(flag) {
            band.temperatureStatus(flag).then(res => {
                console.log(res)
                return plus.toast(res.msg)
            })
        },
        syncRate() {
            band.syncRate(res => {
                console.log(res)
                return plus.toast(res.msg)
            })
        },
        syncBloodPressure() {
            band.syncBloodPressure(res => {
                console.log(res)
                return plus.toast(res.msg)
            })
        },
        syncTemp() {
            band.syncTemperature(res => {
                console.log(res)
                return plus.toast(res.msg)
            })
        },
        testRate() {
            band.testRate(true, res => {
                if (!res.status) return plus.toast(res.msg)
                else this.rate = res.data.status + '/' + res.data.rate
            })
        },
        testBloodPressure() {
            band.testBloodPressure(true, res => {
                if (!res.status) return plus.toast(res.msg)
                else this.bloodPressure = res.data.p0 + '/' + res.data.p1 + '/' + res.data.p2
            })
        },
        queryStepDate() {
            band.queryStepDate(null, res => {
                alert(res.data)
            })
        },
        queryStepInfo() {
            band.queryStepInfo(null, res => {
                console.log(res)
            })
        },
        queryRateDate() {
            band.queryRateDate(null, res => {
                console.log(res)
            })
        },
        queryRateInfo() {
            band.queryRateInfo(null, res => {
                console.log(res)
            })
        },
        querySleepDate() {
            band.querySleepDate(null, res => {
                console.log(res)
            })
        },
        querySleepInfo() {
            band.querySleepInfo(null, res => {
                console.log(res)
            })
        },
        queryBloodPressureDate() {
            band.queryBloodPressureDate(null, res => {
                console.log(res)
            })
        },
        unlock() {
            band.unlock()
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
