<script setup lang="ts">
import FooterCpn from '@/components/FooterCpn.vue';
import HeaderCpn from '@/components/HeaderCpn.vue';
</script>

<template>
    <HeaderCpn/>
    <RouterView />
    <FooterCpn/>
</template>