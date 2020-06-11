<template>
    <!-- <h2>登录页面的测试</h2> -->
    <div class="login">
        <Appbar title="登录"></Appbar>
        <mu-container class="loginBox">
            <mu-form :model="form" class="mu-demo-form">
                <mu-form-item label="请输入手机号" prop="phonenum" fullWidth labelFloat>
                    <mu-text-field v-model="form.phonenum" prop="phonenum"></mu-text-field>
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
                <mu-form-item class="btnBox">
                    <mu-button color="primary" @click="login()">登录/注册</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-container>
    </div>
</template>
<script>
import plus from '../plus.js'
import Appbar from '../components/Appbar'
import $ from '../tool'
export default {
    data() {
        return {
            form: {
                phonenum: '',
                password: ''
            },
            disabled: false,
            count: 0,
            interval: undefined
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
        // async login() {
        // 在Android中使用
        // let res = await plus.signIn(this.form.username, this.form.password)
        // if (res.status == 1) await plus.toat(res.msg)
        // else await plus.alert('error', res.msg)
        // plus.go('http://baidu.com', true)
        //单纯的路由跳转
        // this.$router.replace('/home')
        // },
        async login() {
            //loading加载模块
            setTimeout(() => {
                $.loading(false)
            }, 3000)
            var phone = this.form.phonenum
            console.log(phone)
            let res = await $.post('User', 'sendCode', { phone: this.form.username }, true)
            console.log(res)
        },
        toast() {
            this.$toast.info('验证码已发送')
            // plus.toast('验证码已发送aaa')
        },
        async btnclick() {
            //******loading加载模块
            setTimeout(() => {
                $.loading(false)
            }, 3000)
            //******点击按钮后有个60s的倒计时
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
            // let resphone = await $.post('User', 'sendCode', { phone: this.form.username }, true)
            // let respassword = await $.post('User', 'sendCode', { phone: this.form.password }, true)
            // console.log(res)
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
