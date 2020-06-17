<template>
    <div class="personal">
        <!-- <Appbar show-back></Appbar> -->
        <h2>未来头像的空间</h2>
        <mu-container>
            <mu-tabs :value.sync="active2" color="blue" indicator-color="yellow" full-width>
                <mu-tab>健康状况</mu-tab>
                <mu-tab>健康码</mu-tab>
                <mu-tab>今日轨迹</mu-tab>
            </mu-tabs>
            <div class="demo-text" v-if="active2 === 0">
                <p>
                    <span>今日体温：</span>
                    <span>今日步数：</span>
                </p>
            </div>
            <div class="demo-text" v-if="active2 === 1">
                <p>
                    健康码
                </p>
            </div>
            <div class="demo-text" v-if="active2 === 2">
                <p>待插入地图记录每日行动轨迹</p>
            </div>
        </mu-container>
    </div>
</template>
<script>
// import Appbar from ''
export default {
    name: 'Personal',
    data() {
        return {
            active2: 0
        }
    }
}
</script>
<style scoped>
.personal {
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    padding-top: 56px;
    padding-bottom: 56px;
}
.demo-text {
    padding: 16px;
    background: #fff;
}
/* p {
    margin: 8px 0;
} */
</style>
