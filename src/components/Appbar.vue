<template>
    <div class="appbar">
        <mu-appbar title="Title" style="width: 100%" class="example-appbar" color="primary">
            <div class="table">
                <div class="cell" v-if="showBack" @click="goback"><mu-icon value="keyboard_arrow_left"></mu-icon></div>
                <div class="cell">{{ title }}</div>
            </div>
        </mu-appbar>
    </div>
</template>
<script>
export default {
    name: 'appbar',
    props: { title: String, showBack: Boolean },
    methods: {
        // 添加返回按钮机制，修改路由地址到home或者其他页面
        goback() {
            this.$router.replace('/home')
        }
    }
}
</script>
<style scoped>
.appbar {
    position: fixed;
    top: 0;
    width: 100%;
}
.mu-appbar {
    padding-top: 0.75rem;
    height: 2.2rem;
    border: none;
}
.mu-appbar-title {
    padding-left: 0px;
}
.mu-icon {
    font-size: 0.85rem;
    vertical-align: middle;
}
</style>
