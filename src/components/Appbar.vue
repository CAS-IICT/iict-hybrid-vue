<template>
    <div class="appbar">
        <!-- <mu-appbar style="width: 100%;" color="primary" icon="keyboard_arrow_down"> -->
        <!-- <span>相应的提示信息</span> -->
        <!-- <span icon="keyboard_arrow_left"></span> -->
        <!-- </mu-appbar> -->
        <mu-appbar title="Title" style="width: 100%;" class="example-appbar" color="primary">
            <div class="table">
                <div class="cell" v-if="showBack" @click="goback()">
                    <mu-icon value="keyboard_arrow_left"></mu-icon>
                </div>
                <div class="cell">{{ title }}</div>
            </div>
            <!-- <mu-button flat slot="right">{{ right }}</mu-button> -->
        </mu-appbar>
    </div>
</template>
<script>
export default {
    name: 'appbar',
    props: {
        title: String,
        showBack: Boolean
        // right: String
    },
    methods: {
        // 添加返回按钮机制，修改路由地址到home或者其他页面
        goback() {
            this.$router.back()
        }
    }
}
</script>
<style scoped>
/* .appbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
} */
.cell {
    width: 20px;
}
.mu-appbar-title {
    padding-left: 0px;
}
.mu-icon {
    /* left: 0; */
    font-size: 0.85rem;
    vertical-align: middle;
    /* height: 100%; */
}
</style>
