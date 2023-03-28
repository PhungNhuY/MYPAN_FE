<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);
</script>

<template>
    <h1>Home Page</h1>
    <p>user: {{ user?.email }}</p>
</template>