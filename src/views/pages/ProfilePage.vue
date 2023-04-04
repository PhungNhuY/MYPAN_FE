<script setup lang="ts">import httpService, { callApi } from '@/services/http/http.service';
import authStorageService from '@/services/local-storage/authStorage.service';

const response = await callApi(httpService.get('/user', {
    headers:{
        accesstoken: authStorageService.getAccessToken(),
    }
}));
const user = response.data?.user;
</script>

<template>
    <div class="">{{ user}}</div>
</template>