<script setup lang="ts">
import { ref } from 'vue';
import type { IPost } from '@/common/interfaces';

interface props {
    post: IPost;
}
const Props = defineProps<props>();

// const numOfLike = ref(Props.post.like);
// const isLike = ref(Props.post.isLike);
// function toggleLike(){
//     isLike.value = !isLike.value;
//     numOfLike.value += isLike.value ? 1 : -1;
// }

// const isFavorite = ref(Props.post.isFavotire);
// function toggleFavorite(){
//     isFavorite.value = !isFavorite.value;
// }

</script>

<template>
    <router-link class="link" :to="`/post/${post._id}`">
        <div class="wrapper">
            <div class="main-title" :style="{
                backgroundImage: `linear-gradient(
                            rgba(0, 0, 0, 0.0), 
                            rgba(0, 0, 0, 0.0)
                        ),url(${post.imageCoverLink}),url(/src/assets/images/not-found-1024-opa25.png)`
            }">
                <div class="info">
                    <div class="user d-flex align-items-center">
                        <img :src="post.author?.avatar_link || '/src/assets/images/default-avatar.jpg'" alt="" srcset=""
                            class="avatar">
                        <p class="name">{{ post.author?.fullname }}</p>
                    </div>
                    <p class="post-name">{{ post.name }}</p>
                    <p class="post-description">{{ post.description }}</p>
                </div>
            </div>
            <!-- <div class="function d-flex justify-content-between">
            <div class="left" @click="toggleLike">
                <div class="heart d-flex justify-content-center align-items-center" :class="{ 'active': isLike }">
                    <img src="@/assets/icons/love.png" class="icon" />
                    <p class="number">{{ numOfLike }}</p>
                </div>
            </div>
            <div class="right" @click="toggleFavorite">
                <div class="save d-flex justify-content-center align-items-center" :class="{'active': isFavorite}">
                    <img src="@/assets/icons/bookmark.png" class="icon" />
                    <p class="text">{{ isFavorite ? 'Đã lưu' : 'Lưu' }}</p>
                </div>
            </div>
        </div> -->
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
    height: 240px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #c6c6c6;
}

.main-title {
    width: 100%;
    // height: calc(100% - 40px);
    height: calc(100%);
    background-size: cover;
    background-position: center;
    padding: 0px 15px;
    position: relative;

    .info {
        position: absolute;
        bottom: 10px;

        img {
            width: 24px;
            height: 24px;
            border-radius: 99px;
            margin-top: -2px;
            object-fit: cover;
        }

        .name {
            color: #ffffff;
            font-size: 20px;
            font-weight: 500;
            margin-left: 5px;
            text-shadow: 1px 1px #444444;
        }

        .post-name {
            color: #ffffff;
            font-size: 20px;
            font-weight: 600;
            margin-top: 5px;
            padding-right: 15px;
            text-shadow: 1px 1px #444444;

            // this will show max three line in post name
            // max numer of line = -webkit-line-clamp 
            // max-height = line-height * -webkit-line-clamp
            line-height: 24px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            max-height: 72px;
        }

        .post-description {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
            margin-top: 5px;
            padding-right: 15px;
            text-shadow: 1px 1px #444444;

            line-height: 16px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 32px;
        }
    }
}

.function {
    height: 40px;
    background-color: #343434;
    padding: 6px 10px;

    .left {
        .heart {
            padding-top: 3px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 99px;
            color: white;
            background-color: #424242;

            img {
                margin-top: -3px;
                height: 20px;
                width: auto;
            }
        }

        .active {
            // color: rgb(190, 91, 91);
            color: #29245A;
            background-color: #ffaa55;
        }
    }

    .right {
        .save {
            padding-top: 3px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 99px;
            color: white;
            background-color: #424242;

            img {
                margin-top: -3px;
                height: 15px;
                width: auto;
            }
        }

        .active {
            color: #29245A;
            background-color: #ffaa55
        }
    }
}</style>