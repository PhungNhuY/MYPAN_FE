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
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">
                <img class="logo" src="@/assets/images/cooking.png" alt="" srcset="" width="30" height="30">
            </router-link>

            <form class="d-flex" @submit.prevent="searchAction">
                <input v-model="searchData" class="form-control me-2" type="search" placeholder="Search"
                    aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-show="authStore.user?.email">
                        <router-link to="/getMe" class="nav-item nav-link">GetMe</router-link>
                    </li>
                    <li class="nav-item" v-show="authStore.user?.email">
                        <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
                    </li>
                    <li class="nav-item" v-show="!authStore.user?.email">
                        <router-link to="/auth/login" class="nav-link" href="#">Login</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.logo {
    // width: 30px;
    // height: 30px;
}

.navbar-collapse{
    flex-grow: unset;
}
</style>