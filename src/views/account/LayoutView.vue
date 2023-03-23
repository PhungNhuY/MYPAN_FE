<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';

// redirect home if already logged in
const authStore = useAuthStore();
if(authStore.user){
    router.push('/');
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8 offset-sm-2 mt-5">
                <RouterView />
            </div>
        </div>
    </div>
</template>