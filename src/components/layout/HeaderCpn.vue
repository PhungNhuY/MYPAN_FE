<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';

const authStore = useAuthStore();
</script>

<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link v-show="authStore.user?.email" to="/getMe" class="nav-item nav-link">GetMe</router-link>
            <button v-show="authStore.user?.email" @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
            <router-link v-show="!authStore.user?.email" to="/auth/login" class="nav-item nav-link">Login</router-link>
        </div>
    </nav>
</template>