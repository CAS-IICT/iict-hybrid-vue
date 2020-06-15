<template>
    <div class="tips">
        <div class="moveleft">
            <div>
                <strong>体温</strong>
            </div>
            <div>
                <strong>计步</strong>
                <span></span>
            </div>
        </div>
        <div class="moveright">
            <div>
                <strong>气温</strong>
                <span></span>
            </div>
            <div>
                <strong>湿度</strong>
                <span></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tips'
}
</script>
<style scoped>
.tips {
    position: relative;
    height: 1.6rem;
    width: 100%;
}
.moveleft {
    position: absolute;
    top: 6px;
    left: 6px;
}
.moveright {
    position: absolute;
    top: 6px;
    right: 6px;
}
</style>
