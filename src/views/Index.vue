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
        <mu-button class="demo-button" @click="test" color="primary">message</mu-button>
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
        >
    </div>
</template>
<script>
import plus from '../plus.js'
export default {
    name: 'Index',
    data() {
        return {}
    },
    mounted() {},
    methods: {
        test() {
            this.$toast.message('Hello World')
        }
    }
}
</script>
<style scoped></style>
