<script setup lang="ts">

const Props = defineProps<{active?: Boolean}>();
</script>
<template>
    <div class="wrapper" :class="{'active' : active}">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.wrapper{
    background-color: #FFFFFF;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 5px 5px 0px #c6c6c6;
    margin-top: 10px;
    padding: 16px;
}
.active{
    background-color: #ffaa55;
    color: #FFFFFF;
    font-weight: 600;
}
</style>