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
export default {
    name: 'App',
    data() {
        return {
            alivePages: [],
            transition: ''
        }
    },
    created(){
        if($.TEST) new window.VConsole()
        console.log($.getOS())
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
}
::-webkit-scrollbar {
    display: none;
}
a {
    text-decoration: none !important;
}
#app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
    width: 100%;
}
.fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: 0.3s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
}
.fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: 0.3s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
}
@keyframes fold-left-in {
    0% {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        /* visibility: visible; */
    }
    /*50% {
      transform: translate3d(50%, 0, 0);
    }*/
    100% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
@keyframes fold-left-out {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    /*50% {
      transform: translate3d(-50%, 0 , 0);
    }*/
    100% {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        /* visibility: hidden; */
    }
}

.fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: 0.3s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
}
.fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: 0.3s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
}
@keyframes fold-right-in {
    0% {
        width: 100%;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        /* visibility: visible; */
    }
    /*50% {
      transform: translate3d(50%, 0, 0);
    }*/
    100% {
        width: 100%;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
@keyframes fold-right-out {
    0% {
        width: 100%;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    /*50% {
      transform: translate3d(-50%, 0 , 0);
    }*/
    100% {
        width: 100%;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        /* visibility: hidden; */
    }
}
</style>
