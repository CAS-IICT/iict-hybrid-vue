<template>
    <!-- <h2>登录页面的测试</h2> -->
    <div class="login">
        <Appbar title="登录"></Appbar>
        <mu-container class="loginBox">
            <mu-form :model="form" class="mu-demo-form">
                <mu-form-item label="请输入手机号" prop="phonenum" fullWidth labelFloat>
                    <mu-text-field v-model="form.phonenum" prop="phonenum" type="number"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="请输入验证码" prop="code" fullWidth labelFloat>
                    <mu-text-field type="number" v-model="form.code" prop="code" class="relative">
                        <mu-button small class="send-button" @click="btnclick()" :disabled="disabled" color="success">
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
                code: ''
            },
            disabled: false,
            count: 0,
            interval: undefined,
            status: ''
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
        // 获取验证码模块
        async btnclick() {
            if (!/^1[3456789]\d{9}$/.test(this.form.phonenum)) {
                // 判断是手机号是否有误
                this.$toast.info('手机号码有误请重新输入')
                this.form.phonenum = ''
            } else {
                //******点击按钮后有个60s的倒计时
                this.disabled = true
                this.count = 60
                this.interval = setInterval(() => {
                    this.count--
                    if (this.count == 0) {
                        clearInterval(this.interval)
                        this.disabled = false
                    }
                }, 1000)
                this.$toast.info('验证码已发送')
            }
            let resbtnclick = await $.post(
                'User',
                'sendCode',
                { phone: this.form.phonenum, device: $.getUserAgent() },
                true
            )
            console.log(resbtnclick)
        },
        // 登录注册按钮
        async login() {
            if (!/^\d{6}$/.test(this.form.code)) {
                //前端先对输入的的验证码的位数进行一次判断，如果不是6位直接提示让重新输入同时清空输入内容
                this.$toast.info('验证码输入有误，请重新输入')
                // console.log('aaa')

                this.form.code = ''
            } else {
                //如果位数满足6位则可以将该数据传递到后端
                let reslogin = await $.post(
                    'User',
                    'login',
                    { phone: this.form.phonenum, code: this.form.code, device: $.getUserAgent() },
                    true
                )
                console.log(reslogin)
                this.status = reslogin.status
                //本地存储
                $.setItem('token', reslogin.data.token)
                $.setItem('id', reslogin.data.id)
                if (this.status == 1) {
                    //如果一切都没有问题则进行路由跳转
                    this.$router.replace('/home')
                } else {
                    this.$toast.info('验证码输入有误，请重新输入')
                    this.form.code = ''
                }
            }
        }
        //提示验证码已经发送的模块
        // toast() {
        //     this.$toast.info('msg')
        // }

        // var username = this.form.username;
        // var code = this.form.code;
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
