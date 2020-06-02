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
                <mu-form-item class="btnBox">
                    <mu-button color="primary" @click="login">登录</mu-button>
                    <mu-button color="primary">注册</mu-button>
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
                username: '',
                password: ''
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
            plus.toast('ssss')
            var username = this.form.username
            var password = this.form.password
            let res = await plus.signIn(username, password)
            //console.log(res)
            //this.$router.replace('/home')
            // console.log(username)
            // console.log(password)
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
    max-width: 460px;
}

.btnBox .mu-form-item-content {
    margin: 0 auto;
}

.loginBox {
    padding: 20% 5%;
}
</style>
