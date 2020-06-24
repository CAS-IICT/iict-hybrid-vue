<template>
    <!-- <h2>登录页面的测试</h2> -->
    <div class="login">
        <Appbar title="登录"></Appbar>
        <mu-container class="loginBox">
            <mu-form :model="form" class="mu-demo-form">
                <mu-form-item label="用户名" prop="username" fullWidth labelFloat>
                    <mu-text-field v-model="form.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" fullWidth labelFloat>
                    <mu-text-field type="password" v-model="form.password" prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="login">登录</mu-button>
                    <mu-button color="primary">注册</mu-button>
                    <mu-button color="primary" @click="scan">扫描</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="showUserInfo">查看信息</mu-button>
                    <mu-button color="primary" @click="signOut">退出登陆</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="checkBle">检查蓝牙</mu-button>
                    <mu-button color="primary" @click="openBle">打开蓝牙</mu-button>
                    <mu-button color="primary" @click="scanBle">扫描蓝牙</mu-button>
                    <mu-button color="primary" @click="getBleMac">获取蓝牙MAC</mu-button>
                </mu-form-item>
                <ul>
                    <li v-for="(item, key) in bleList" :key="key">{{ item.name }}-RSSI-{{ item.rssi }}</li>
                </ul>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="getLoc()">获取高德定位</mu-button>
                    <mu-button color="primary" @click="getWeather(1)">获取实时天气</mu-button>
                    <mu-button color="primary" @click="getWeather(2)">获取预测天气</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="cropper()">获取图片裁剪</mu-button>
                    <img :src="img" alt />
                </mu-form-item>
            </mu-form>
        </mu-container>
    </div>
</template>
<script>
import plus from '../plus.js'
import Appbar from '../components/Appbar'
export default {
    data() {
        return {
            bleList: [],
            img: '',
            form: {
                username: 'devilyouwei@gmail.com',
                password: 'h18015647707'
            }
        }
    },
    components: {
        Appbar: Appbar
    },
    mounted() {
        setTimeout(() => {
            plus.setStatusBar('#2196f3')
        }, 1000)
    },
    methods: {
        // CheckDataIsNull(val) {
        //     if (val == null || val == '') {
        //         return false
        //     } else return true
        // },
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
        async scanBle() {
            this.regBleScanResult()
            plus.scanBle(15000)
        },
        async checkBle() {
            let res = await plus.checkBle()
            console.log(res)
        },
        async openBle() {
            let res = await plus.openBle()
            console.log(res)
        },
        async getBleMac() {
            let res = await plus.getBleMac()
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
        async regBleScanResult(batch) {
            this.bleList = []
            if (batch) {
                console.log('register BleOnBatchScanResult')
                plus.register('BleOnBatchScanResult', res => {
                    // 注册蓝牙返回消息
                    let data = JSON.parse(res).data
                    console.log(data)
                    this.bleList = data
                })
            } else {
                console.log('register BleOnScanResult')
                plus.register('BleOnScanResult', res => {
                    // 注册蓝牙返回消息
                    let data = JSON.parse(res).data
                    if (data.name && data.mac) {
                        console.log(data)
                        for (let i in this.bleList)
                            if (this.bleList[i].name == data.name) return (this.bleList[i] = data)
                        this.bleList.push(data)
                    }
                })
            }
        },
        async cropper() {
            let res = await plus.cropper(true, 300, 300, 100)
            this.img = res.data
            console.log(res)
        }
    }
}
</script>
<style>
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
