<script setup lang="ts">
import AlertCpn from '@/components/AlertCpn.vue';
import FooterCpn from '@/components/FooterCpn.vue';
import HeaderCpn from '@/components/HeaderCpn.vue';

</script>

<template>
    <HeaderCpn/>
    <AlertCpn />
    <RouterView />
    <FooterCpn/>
</template>