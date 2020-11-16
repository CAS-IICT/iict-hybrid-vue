<template>
    <!-- <h2>登录页面的测试</h2> -->
    <div class="login">
        <Appbar title="登录" class="appbar"></Appbar>
        <mu-container class="loginBox">
            <mu-form :model="form" class="mu-demo-form">
                <mu-form-item label="用户名" prop="username" fullWidth labelFloat>
                    <mu-text-field v-model="form.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" fullWidth labelFloat>
                    <mu-text-field type="password" v-model="form.password" prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="goBand">关于手环</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="showUserInfo">查看信息</mu-button>
                    <mu-button color="primary" @click="signOut">退出登陆</mu-button>
                    <mu-button color="primary" @click="crack">crack</mu-button>
                </mu-form-item>
                <div>BLE: {{ mac.bluetooth }}</div>
                <div>WIFI: {{ mac.wifi }}</div>
                <div>UUIDs</div>
                <div v-for="(item, index) in uuids" :key="index">{{ item }}</div>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="checkBle">检查蓝牙</mu-button>
                    <mu-button color="primary" @click="openBle">打开蓝牙</mu-button>
                    <mu-button color="primary" @click="scanBle(false)">扫描蓝牙(普通)</mu-button>
                    <mu-button color="primary" @click="scanBle(true)">扫描蓝牙(low power)</mu-button>
                    <mu-button color="primary" @click="scanWifi">扫描WIFI</mu-button>
                </mu-form-item>
                <mu-list>
                    <mu-list-item
                        button
                        :ripple="true"
                        v-for="(item, index) in bleList"
                        :key="index"
                        @click="connectBle(item)"
                    >
                        <mu-list-item-action>
                            <mu-icon class="iconfont" value=":iconshanfushouhuan"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>{{ item.name }}</mu-list-item-title>
                    </mu-list-item>
                </mu-list>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="getLoc()">获取高德定位</mu-button>
                    <mu-button color="primary" @click="getWeather(1)">获取实时天气</mu-button>
                    <mu-button color="primary" @click="getWeather(2)">获取预测天气</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="cropper()">获取图片裁剪</mu-button>
                    <img :src="img" alt />
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <input type="text" v-model="url" />
                    <mu-button color="primary" @click="openUrl(url)">打开url页面</mu-button>
                    <mu-button color="primary" @click="openMapActivity(path)">打开高德地图</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="switchStatusColor()">切换状态栏颜色</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-container>
    </div>
</template>
<script>
import plus from '../plus.js'
import $ from '../tool.js'
import Appbar from '../components/Appbar'
export default {
    data() {
        return {
            bleList: [],
            uuids: [],
            url: 'http://www.baidu.com',
            img: '',
            path: '/map',
            color: 'dark',
            mac: {
                bluetooth: '',
                wifi: ''
            },
            form: {
                username: 'devilyouwei@gmail.com',
                password: 'h18015647707'
            }
        }
    },
    components: {
        Appbar: Appbar
    },
    async mounted() {
        this.uuids = (await plus.setGATT()).data['uuids'] // 设置蓝牙broadcast
        this.mac = (await plus.getMac()).data // 获取mac
        this.getWinSize()
    },
    methods: {
        // CheckDataIsNull(val) {
        //     if (val == null || val == '') {
        //         return false
        //     } else return true
        // },
        goBand() {
            this.$router.push('/Band')
        },
        async login() {
            let res = await plus.signIn(this.form.username, this.form.password)
            plus.toast(res.msg)
        },
        async signOut() {
            let res = await plus.signOut()
            plus.toast(res.msg)
        },
        async showUserInfo() {
            let res = await plus.getClingUserInfo()
            plus.alert('userinfo', JSON.stringify(res))
        },
        async scan() {
            let res = await plus.scan(true, 10000)
            console.log(res)
        },
        async scanBle(lowpower = false) {
            this.bleList = [] //清除扫描历史列表
            plus.scanBle(5000, lowpower, res => {
                let data = res.data
                if (data.name && data.mac) {
                    // 遍历是否已经扫描到过
                    for (let i in this.bleList) if (this.bleList[i].mac == data.mac) return (this.bleList[i] = data)
                    this.bleList.push(data)
                }
            })
        },
        async scanWifi() {
            this.bleList = []
            let res = await plus.scanWifi()
            if (res.status == 1) {
                // 过滤同mac
                let list = {}
                for (let item of res.data) {
                    list[item.mac] = item
                }
                for (let i in list) {
                    this.bleList.push(list[i])
                }
            }
        },
        async checkBle() {
            let res = await plus.checkBle()
            console.log(res)
        },
        async openBle() {
            let res = await plus.openBle()
            console.log(res)
        },
        async getLoc() {
            let res = await plus.getLoc()
            console.log(res)
        },
        async getWeather(type) {
            let res = await plus.getWeather(type)
            console.log(res)
        },
        connectBle(device) {
            const info = `uuid: ${device.uuids && device.uuids[0]}\nmac: ${device.mac}\nrssi: ${device.rssi}`
            plus.alert(device.name, info)
            //plus.connectBle(device)
        },
        async cropper() {
            let res = await plus.cropper(true, 300, 300, 100)
            this.img = res.data
            console.log(res)
        },
        async openUrl(url) {
            plus.go(url, true)
        },
        async openMapActivity(path) {
            plus.openMapActivity(path)
        },
        async switchStatusColor() {
            if (this.color == 'dark') {
                this.color = 'light'
                plus.setStatusBar({ background: '#2196f3', color: this.color })
            } else {
                this.color = 'dark'
                plus.setStatusBar({ background: '#ffffff', color: this.color })
            }
        },
        async getWinSize() {
            const win = await plus.getWinSize()
            console.log(win)
        },
        async crack() {
            for (let i = 0; i < 10000; i++) {
                $.post('Test', 'test')
                    .then(res => {
                        res = JSON.parse(res)
                        if (res.status == 1) {
                            console.log(res)
                            const long = 120.774837
                            const lat = 31.293951
                            const randomx = parseInt($.random(100, 999999)) / 1000000
                            const randomy = parseInt($.random(100, 999999)) / 1000000
                            let locData = {
                                id: res.data.id,
                                token: '123',
                                longitude: parseInt($.random(0, 1)) == 0 ? long + randomx : long - randomx,
                                latitude: parseInt($.random(0, 1)) == 0 ? lat + randomy : lat - randomy,
                                altitude: 1,
                                provider: 'test',
                                time: new Date().getTime() / 1000,
                                address: 'test',
                                city: 'test',
                                area: 'test',
                                street: 'test'
                            }
                            return $.post('GPS', 'updateLocation', locData)
                        }
                    })
                    .then(res => {
                        console.log(res)
                    })
                await $.sleep(1)
            }
        }
    }
}
</script>
<style>
.appbar {
    position: fixed;
    top: 0;
    opacity: 1;
    z-index: 999;
    width: 100%;
}
.mu-demo-form {
    width: 100%;
    max-width: 460px;
}

.btnBox .mu-form-item-content {
    margin: 0 auto;
}

.loginBox {
    padding: 20% 5%;
}
</style>
