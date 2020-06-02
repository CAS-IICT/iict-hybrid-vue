<template>
    <div id="app">
        <transition :name="transition">
            <keep-alive :include="alivePages">
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import $ from './tool.js'
import plus from './plus.js'

export default {
    name: 'App',
    data() {
        return {
            alivePages: [],
            transition: ''
        }
    },
    created() {
        // 当前环境为测试环境，显示vconsole
        if ($.TEST) new window.VConsole()
        console.log($.getOS())
    }
}
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
}
::-webkit-scrollbar {
    display: none;
}
a {
    text-decoration: none !important;
}
</style>
