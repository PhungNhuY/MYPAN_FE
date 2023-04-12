<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);
</script>

<template>
    <h1>Home Page</h1>
    <div class="container">
        <div class="row">
            <div class="col-7 offset-1 main-col">
                sbf
            </div>
            <div class="col-3 feature-col">
                adbe
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-col{
    background-color: aqua;
    margin-right: 10px;
}

.feature-col{
    background-color: black;
}
</style>