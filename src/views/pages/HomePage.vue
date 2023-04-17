<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { storeToRefs } from 'pinia';
import SliderAndSearch from '@/components/SliderAndSearch.vue';
import PostCard from '@/components/PostCard.vue';
import type { IPostCard } from '@/common/interfaces';

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);
</script>

<template>
    <h1>Home Page</h1>
    <div class="container">
        <div class="row">
            <div class="col-7 offset-1 main-col">
                <SliderAndSearch/>
                <PostCard :post-card="{
                    id: '1234',
                    imageCover: '/slider-temp/1.webp',
                    postName: 'Sườn non hảo hạng',
                    username: 'Phung Nhu Y',
                    userAvatar: null,
                    like: 100,
                    isLike: false,
                    isFavotire: false,
                }"/>
            </div>
            <div class="col-3 feature-col">
                adbe
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-col{
    margin-right: 10px;
}

.feature-col{
    background-color: black;
}
</style>