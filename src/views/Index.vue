<template>
    <div>
        <div class="test" v-ripple="'rgba(255, 255, 255, 0.35)'">test</div>
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
            show: false,
            path: ['/home', '/personal'],
            title: ['首页', '个人中心'],
            tab: 0
        }
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
.test {
    width: 10rem;
    height: 10rem;
    background: #000;
    color: #fff;
}
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
