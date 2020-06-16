<template>
    <div class="radar" @click="delayscan()">
        <div class="avatar"></div>
        <div :class="animatestyle"></div>
        <div class="container" :class="animatestyle"></div>
        <div class="outter" :class="animatestyle"></div>
    </div>
</template>
<script>
export default {
    name: 'radar',
    props: {},
    data() {
        return {
            flag: false,
            timeout: true,
            animatestyle: '',
            del: undefined
        }
    },
    mounted() {
        setTimeout(() => {
            this.animatestyle = 'inner'
        }, 1000)
    },

    methods: {
        // delay() {
        //     setTimeout(function () {
        //         this.timeout = false
        //     }, 5000)
        // },
        delayscan() {
            // this.$options.methods.delay()
            // if (this.timeout) {
            //     console.log('true')
            // } else {
            //     console.log('false')
            // }
            this.animatestyle = ''
            setTimeout(() => {
                this.animatestyle = 'inner'
            }, 100)
        }
    }
}
</script>
<style scoped>
/* .radar {
    position: relative;
    height: 9rem;
} */
div.inner {
    width: 2rem;
    height: 2rem;
    background: #ff5e5e;
    border-radius: 50%;
    position: fixed;
    left: 50%;
    margin-left: -0.99rem;
    margin-top: 3.344rem;
    z-index: 10;
    animation-duration: 2.4s;
    z-index: 10;
    -webkit-animation-name: state1;
    animation-name: state1;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: 3;
    animation-iteration-count: 3;
    opacity: 0;
}

@keyframes state1 {
    0% {
        opacity: 0.5;
        border-radius: 50%;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    100% {
        opacity: 0;
        border-radius: 50%;
        -webkit-transform: scale(4.5);
        transform: scale(4.5);
    }
}

.avatar {
    position: fixed;
    left: 50%;
    margin-left: -0.616rem;
    margin-top: 3.784rem;
    border-radius: 50%;
    width: 1.232rem;
    height: 1.232rem;
    background-color: #fff;
    z-index: 11;
}
.container {
    animation-delay: 0.8s;
}
.outter {
    animation-delay: 1.5s;
}
</style>
