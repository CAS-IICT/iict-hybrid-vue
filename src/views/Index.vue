<template>
    <div>
        <transition name="fade">
            <div class="index" v-show="show">
                <!-- <h1>IICT Hybrid Vue</h1> -->
                <Appbar :title="title[tab]"></Appbar>
                <router-view></router-view>
                <!-- 底部导航栏 -->
                <mu-bottom-nav @change="itemClick">
                    <mu-bottom-nav-item title="首页" icon="home"></mu-bottom-nav-item>
                    <mu-bottom-nav-item title="个人中心" icon="account_circle"></mu-bottom-nav-item>
                </mu-bottom-nav>
            </div>
        </transition>
    </div>
</template>
<script>
import plus from '../plus.js'
import Appbar from '../components/Appbar'
export default {
    name: 'Index',
    // props: {
    //     path: String
    // },
    data() {
        return {
            shift: 'movies',
            show: false,
            path: ['/home', '/personal'],
            title: ['首页', '个人中心'],
            tab: 0
        }
    },
    components: {
        Appbar: Appbar
    },
    mounted() {
        this.show = true
        plus.setStatusBar('#2196f3')
    },

    methods: {
        itemClick(e) {
            this.$router.replace(this.path[e])
            this.tab = e
        }
    }
}
</script>
<style scoped>
.index {
    height: 100%;
}
.mu-bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
}
.mu-bottom-item {
    max-width: 100%;
}
</style>
