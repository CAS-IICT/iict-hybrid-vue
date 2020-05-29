<template>
    <div class="index">
        <h1>IICT Hybrid Vue</h1>
        <!-- <button @click="test(true)">opentest</button> -->
        <!-- <button @click="test(false)">closetest</button> -->
        <!-- <mu-container class="button-wrapper">
            <mu-button color="primary">Primary</mu-button>
            <mu-button color="secondary">Secondary</mu-button>
            <mu-button color="success">Success</mu-button>
            <mu-button color="warning">Warning</mu-button>
            <mu-button color="info">Info</mu-button>
            <mu-button color="error">Error</mu-button>
            <mu-button disabled>disabled</mu-button>
        </mu-container> -->
        <!-- <mu-button class="demo-button" @click="test" color="primary">message</mu-button>
        <mu-button class="demo-button" @click="$toast.success('Hello World')" color="success"
            >success</mu-button
        >
        <mu-button class="demo-button" @click="$toast.warning('Hello World')" color="warning"
            >warning</mu-button
        >
        <mu-button class="demo-button" @click="$toast.info('Hello World')" color="info"
            >info</mu-button
        >
        <mu-button class="demo-button" @click="$toast.error('Hello World')" color="error"
            >error</mu-button
        > -->
        <!-- 弹出按钮 -->
        <mu-container>
            <mu-button class="demo-button" color="primary" @click="alert()">Alert</mu-button>
            <mu-button class="demo-button" color="secondary" @click="confirm()">Confirm</mu-button>
            <mu-button class="demo-button" color="teal" @click="prompt()">Prompt</mu-button>
        </mu-container>
        <!-- 底部导航栏 -->
        <mu-container style="width: 100%;">
            <mu-bottom-nav :value.sync="shift" shift>
                <mu-col span="6">
                    <mu-bottom-nav-item value="home" title="首页" icon="home"></mu-bottom-nav-item>
                </mu-col>
                <mu-col span="6">
                    <mu-bottom-nav-item
                        value="profile"
                        title="个人中心"
                        icon="account_circle"
                    ></mu-bottom-nav-item>
                </mu-col>
            </mu-bottom-nav>
        </mu-container>
    </div>
</template>
<script>
import plus from '../plus.js'
export default {
    name: 'Index',
    data() {
        return {
            shift: 'movies'
        }
    },
    mounted() {},
    // methods: {
    //     test() {
    //         this.$toast.message('Hello World')
    //         // this.$toast.success('Hello World')
    //     }
    // }

    methods: {
        alert() {
            this.$alert('Hello World', '提示', {
                okLabel: '知道了'
            }).then(() => {
                this.$toast.message('提示信息')
            })
        },
        confirm() {
            this.$confirm('确定要删除？', '提示', {
                type: 'warning'
            }).then(({ result }) => {
                if (result) {
                    this.$toast.message('点击了确定')
                } else {
                    this.$toast.message('点击了取消')
                }
            })
        },
        prompt() {
            this.$prompt('请输入邮箱', '提示', {
                validator(value) {
                    return {
                        valid: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
                            value
                        ),
                        message: '请输入正确邮箱格式'
                    }
                }
            }).then(({ result, value }) => {
                if (result) {
                    this.$toast.message('你输入的邮箱：' + value)
                } else {
                    this.$toast.message('点击了取消')
                }
            })
        }
    }
}
</script>
<style scoped></style>
