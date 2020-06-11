<template>
    <!-- <h2>登录页面的测试</h2> -->
    <div class="login">
        <Appbar title="登录"></Appbar>
        <mu-container class="loginBox">
            <mu-form :model="form" class="mu-demo-form">
                <mu-form-item label="请输入手机号" prop="username" fullWidth labelFloat>
                    <mu-text-field v-model="form.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="请输入验证码" prop="password" fullWidth labelFloat>
                    <mu-text-field type="password" v-model="form.password" prop="password" class="relative">
                        <mu-button
                            small
                            class="send-button"
                            @click="toast(), btnclick()"
                            :disabled="disabled"
                            color="success"
                        >
                            {{ btnText }}
                        </mu-button>
                    </mu-text-field>
                </mu-form-item>
<<<<<<< HEAD
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="login">登录</mu-button>
                    <mu-button color="primary">注册</mu-button>
                    <mu-button color="primary" @click="scan">扫描</mu-button>
                    <mu-button color="primary" @click="scan">扫描</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="showUserInfo">查看信息</mu-button>
                    <mu-button color="primary" @click="signOut">退出登陆</mu-button>
                </mu-form-item>
                <mu-form-item class="btn-box">
                    <mu-button color="primary" @click="checkBle">检查蓝牙</mu-button>
                    <mu-button color="primary" @click="openBle">打开蓝牙</mu-button>
=======
                <mu-form-item class="btnBox">
                    <mu-button color="primary" @click="login">登录/注册</mu-button>
>>>>>>> b3f5305... radar
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
            form: {
<<<<<<< HEAD
                username: 'devilyouwei@gmail.com',
                password: 'h18015647707'
            }
=======
                username: '',
                password: ''
            },
            disabled: false,
            count: 0,
            interval: undefined
>>>>>>> b3f5305... radar
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
    unmounted() {
        clearInterval(this.interval)
    },
    computed: {
        btnText() {
            return this.count !== 0 ? `${this.count}秒再次获取` : '获取验证码'
        }
    },
    methods: {
        async login() {
<<<<<<< HEAD
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
            let res = await plus.scan(true)
            console.log(res)
        },
        async checkBle() {
            let res = await plus.checkBle()
            console.log(res)
        },
        async openBle() {
            let res = await plus.openBle()
            console.log(res)
=======
            // 在Android中使用
            // let res = await plus.signIn(this.form.username, this.form.password)
            // if (res.status == 1) await plus.toat(res.msg)
            // else await plus.alert('error', res.msg)
            // plus.go('http://baidu.com', true)
            //单纯的路由跳转
            this.$router.replace('/home')
        },
        toast() {
            // this.$toast.info('验证码已发送')
            plus.toast('验证码已发送aaa')
        },
        btnclick() {
            //按钮60s倒计时
            this.disabled = true
            this.count = 60
            // this.getCode() //60s倒计时过后才能调用的事件
            this.interval = setInterval(() => {
                this.count--
                if (this.count == 0) {
                    clearInterval(this.interval)
                    this.disabled = false
                }
            }, 1000)
>>>>>>> b3f5305... radar
        }

        // var username = this.form.username;
        // var password = this.form.password;
        // getuser(val, val2) {
        //     this.$axios.post('/api/Logins/UserInfo?userId=' + val2 + '&token=' + val + '').then(response => {
        //         let _data = response.data
        //         if (_data == null) {
        //             this.$emit('newNodeEvent', '用户验证信息已过期!')
        //         } else {
        //             localStorage.setItem('userInfo', JSON.stringify(_data))
        //         }
        //     })
        // }
    }
}
</script>
<style>
.mu-demo-form {
    width: 100%;
}

.btnBox .mu-form-item-content {
    margin: 0 auto;
}

.loginBox {
    padding: 20% 5%;
}
.send-button {
    position: absolute;
    right: 0rem;
    bottom: 0.1rem;
}
</style>
