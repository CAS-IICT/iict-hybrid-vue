<template></template>
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
        this.loc = (await plus.getLoc()).data.city
    }
}
</script>
<style scoped></style>
