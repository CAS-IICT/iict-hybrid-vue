<template>
    <div class="index">
        <h1>IICT Hybrid Vue</h1>
        <!-- 弹出按钮 -->
        <mu-container>
            <mu-button @click="alert()" class="demo-button" color="primary">Alert</mu-button>
            <mu-button @click="confirm()" class="demo-button" color="secondary">Confirm</mu-button>
            <mu-button @click="prompt()" class="demo-button" color="teal">Prompt</mu-button>
        </mu-container>
        <!-- 底部导航栏 -->
        <mu-container style="width: 100%;">
            <mu-bottom-nav :value.sync="shift" shift>
                <mu-col span="6">
                    <mu-bottom-nav-item icon="home" title="首页" value="home"></mu-bottom-nav-item>
                </mu-col>
                <mu-col span="6">
                    <mu-bottom-nav-item
                        icon="account_circle"
                        title="个人中心"
                        value="profile"
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
