<script setup lang="ts">
import type { IPost } from '@/common/interfaces';

interface props {
    data: IPost;
}
const Props = defineProps<props>();
</script>

<template>
    <router-link class="link" :to="`/post/${data._id}`">
        <div class="wrapper">
            <div class="row">
                <div class="col-8 py-2 px-5 pb-5 info">
                    <p class="name">{{ data.name }}</p>
                    <hr />
                    <div class="d-flex justify-content-around my-2">
                        <div v-if="data.time" class="time">
                            <img src="@/assets/icons/clock.png" alt="" class="icon">
                            <p class="content">{{ data.time }} phút</p>
                        </div>
                        <div v-if="data.ration" class="ration">
                            <img src="@/assets/icons/person.png" alt="" class="icon">
                            <p class="content">{{ data.ration }} người</p>
                        </div>
                    </div>
                    <p class="ingre">Nguyên liệu: {{ data.ingredients?.map(i => i.name).join(', ') }}</p>
                    <p class="date">Ngày đăng: {{ new Date(data.createdAt).toLocaleDateString('en-GB') }}</p>
                </div>
                <div class="col-4">
                    <div class="right">
                        <img :src="data.imageCoverLink" alt="" srcset="" class="image-cover">
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style scoped lang="scss">
p,
hr {
    margin: 0px;
    padding: 0px;
}

.wrapper {
    width: 100%;
    min-height: 150px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #eeeeee;
    background-color: #eeeeee;
    margin-bottom: 10px;

    &:hover {
        background-color: #dddddd;
    }
}

.link{
    text-decoration: none;
    color: black;
}

.row {
    height: 100%;
    min-height: 150px;
}

.right {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.image-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info {
    position: relative;

    .name {
        font-size: 22px;
        margin: 0px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        font-weight: 600;
        color: #ff9933;
    }

    .icon {
        width: 16px;
        height: 16px;
    }

    .content {
        font-size: 16px;
        display: inline;
    }

    .ingre {
        font-size: 16px;
        line-height: 16px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 32px;
    }

    .date {
        position: absolute;
        bottom: 0px;
        left: 30px;
        font-size: 14px;
        color: #666666;
    }
}</style>