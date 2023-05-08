<script setup lang="ts">
import type { IPost } from '@/common/interfaces';

interface props {
    post: IPost;
}
const Props = defineProps<props>();
</script>

<template>
<router-link :to="`/post/${post._id}`" class="link">
    <div class="wrapper">
        <div class="main-content">
            <img v-if="post.imageCoverLink" :src="post.imageCoverLink" alt="" srcset="" class="image-cover">
            <!-- <img v-else src="@/assets/images/not-found-512.png" alt="" srcset="" class="image-cover"> -->
            <div v-else class="not-found">
                <img src="@/assets/images/not-found-512.png" alt="" srcset="" class="image-cover opacity-25">
            </div>
            <p class="name">{{ post.name }}</p>
        </div>
    </div>
</router-link>
</template>

<style scoped lang="scss">
p {
    margin: 0px;
    padding: 0px;
}
.link{
    text-decoration: none;
    color: black;
}
.wrapper {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #c6c6c6;
    background-color: #aaaaaa;
}

.main-content{
    .image-cover{
        width: 100%;
        height: 100px;
        object-fit: cover;
    }
    .name{
        color: #ffffff;
        margin-left: 10px;
        margin-top: 20px;
        font-size: 18px;
        font-weight: 500;

        line-height: 18px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 54px;
    }
}
.not-found{
    background-color: #ffffff;
    width: 100%;
    height: 100px;
    .image-cover{
        object-fit: contain;
    }
}
</style>