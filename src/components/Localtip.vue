<template>
    <div class="localtip">
        <div class="icon">
            <i class="iconfont iconlocation"></i>
            <div class="loacl">{{ loc }}</div>
        </div>
    </div>
</template>
<script>
import plus from '../plus'
export default {
    name: 'localtip',
    data() {
        return {
            loc: ''
        }
    },
    async mounted() {
        //获取位置信息
        this.loc = await plus.getLoc()
        // 将位置信息中的json格式数据转化为前端的对象
        this.loc = JSON.parse(this.loc.data).city
    }
}
</script>
<style scoped>
.icon {
    /* position: absolute; */
    text-align: center;
    float: right;
    right: 1rem;
}
.iconfont {
    font-size: 1rem;
}
</style>
