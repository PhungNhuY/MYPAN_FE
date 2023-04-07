<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { ref } from 'vue';

const authStore = useAuthStore();

const searchData = ref('');

function searchAction() {
    console.log(searchData.value);
}
</script>

<template>
    <ul class="">
        <li class="" v-show="authStore.user?.email">
            <router-link to="/getMe" class="">GetMe</router-link>
        </li>
        <li class="" v-show="authStore.user?.email">
            <button @click="authStore.logout()" class="">Logout</button>
        </li>
        <li class="" v-show="!authStore.user?.email">
            <router-link to="/auth/login" class="" href="#">Login</router-link>
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>