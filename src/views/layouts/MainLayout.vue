<script setup lang="ts">
import FooterCpn from '@/components/layout/FooterCpn.vue';
import HeaderCpn from '@/components/layout/HeaderCpn.vue';

</script>

<template>
    <HeaderCpn/>
    <div class="wrapper">
        <Suspense>
            <RouterView />
        </Suspense>
    </div>
    <FooterCpn/>
</template>

<style scoped lang="scss">
.wrapper{
    min-height: 90vh;
}
</style>