<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';

const authStore = useAuthStore();
</script>

<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link to="/users" class="nav-item nav-link">Users</router-link>
            <button v-show="authStore.user" @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
        </div>
    </nav>
</template>