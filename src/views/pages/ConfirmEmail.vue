<script setup lang="ts">
import { useRoute } from 'vue-router';
import {checkConfirm} from '@/services/auth.service';

// get token from route
const route = useRoute();
const token = route.query.token as string;
const ans = await checkConfirm(token);
</script>

<template>
    <div class="wrapper">
        <p v-if="ans">Xác thực email thành công.</p>
        <router-link class="link" to="/">
            <button class="btn">Quay lại trang chủ</button>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.wrapper{
    padding-top: 30vh;
    width: 100%;
    height: 80vh;
    text-align: center;
    p{
        font-size: 20px;
        font-weight: 500;
    }
    .btn{
        width: 100%;
        max-width: 200px;
        height: 40px;
        background-color: #ffaa55;
        color: white;
        font-size: 20px;
        font-weight: 500;
    }
}
.link{
    text-decoration: none;
    color: black;
}
</style>