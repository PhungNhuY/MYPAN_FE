<script setup lang="ts">
import { ref } from 'vue';
const numOfLike = ref(100);
const isLike = ref(false);
function toggleLike(){
    isLike.value = !isLike.value;
    numOfLike.value += isLike.value ? 1 : -1;
}

const isFavorite = ref(false);
function toggleFavorite(){
    isFavorite.value = !isFavorite.value;
}
</script>

<template>
    <div class="wrapper">
        <div class="main-title" :style="{
            backgroundImage: `linear-gradient(
                            rgba(0, 0, 0, 0.25), 
                            rgba(0, 0, 0, 0.25)
                        ),url(/slider-temp/1.webp)` }">
            <div class="info">
                <div class="user d-flex align-items-center">
                    <img src="@/assets/images/default-avatar.jpg" alt="" srcset="" class="avatar">
                    <p class="name">Phung Nhu Y</p>
                </div>
                <p class="post-name">Sườn non ram tỏi(Khẩu vị Ngọt)</p>
            </div>
        </div>
        <div class="function d-flex justify-content-between">
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
p {
    margin: 0px;
    padding: 0px;
}

.wrapper {
    width: 100%;
    height: 240px;
    border-radius: 10px;
    overflow: hidden;
}

.main-title {
    width: 100%;
    height: calc(100% - 40px);
    background-size: cover;
    background-position: center;
    padding: 0px 15px;
    position: relative;

    .info {
        position: absolute;
        bottom: 10px;
        img {
            width: 30px;
            height: 30px;
            border-radius: 99px;
        }

        .name {
            color: #ffffff;
            font-size: 18px;
            font-weight: 500;
            margin-left: 10px;
        }

        .post-name {
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
            margin-top: 5px;
            padding-right: 15px;

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
    }
}
.function{
    height: 40px;
    background-color: #242424;
    padding: 6px 15px;
    .left{
        .heart{
            padding-top: 3px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 99px;
            color: white;
            background-color: #424242;
            img{
                margin-top: -3px;
                height: 20px;
                width: auto;
            }
        }
        .active{
            // color: rgb(190, 91, 91);
            color: #29245A;
            background-color: #ffaa55;
        }
    }

    .right{
        .save{
            padding-top: 3px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 99px;
            color: white;
            background-color: #424242;
            img{
                margin-top: -3px;
                height: 15px;
                width: auto;
            }
        }
        .active{
            color: #29245A;
            background-color: #ffaa55
        }
    }
}
</style>