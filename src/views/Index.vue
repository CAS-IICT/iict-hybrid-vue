<template>
    <div class="index">
        <!-- <h1>IICT Hybrid Vue</h1> -->
        <mu-appbar style="width: 100%;" title="Title" color="primary"></mu-appbar>
        <router-view></router-view>
        <!-- 底部导航栏 -->
        <mu-bottom-nav @change="itemClick">
            <mu-bottom-nav-item title="首页" icon="home"></mu-bottom-nav-item>
            <mu-bottom-nav-item title="个人中心" icon="account_circle"></mu-bottom-nav-item>
        </mu-bottom-nav>
    </div>
</template>
<script>
import plus from '../plus.js'
export default {
    name: 'Index',
    // props: {
    //     path: String
    // },
    data() {
        return {
            shift: 'movies',
            path: ['/home', '/personal']
        }
    },
    mounted() {},

    methods: {
        itemClick(e) {
            this.$router.replace(this.path[e])
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
