<script setup lang="ts">
import FooterCpn from '@/components/layout/FooterCpn.vue';
import HeaderCpn from '@/components/layout/HeaderCpn.vue';

</script>

<template>
    <HeaderCpn/>
    <Suspense>
        <RouterView />
    </Suspense>
    <FooterCpn/>
</template>