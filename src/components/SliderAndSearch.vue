<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import SearchForm from './SearchForm.vue';
import { ref } from 'vue';
import router from '@/router';

const link = ref('#');
const name = ref('');
const username = ref('');

function update(splide: any){
    link.value = `/post/${data[splide.index].id}`;
    name.value = data[splide.index].name;
    username.value = data[splide.index].username;
}
const data = [
    {
        name: 'Bánh Tráng trộng',
        username: 'Phùng Như Ý',
        image: '/slider-temp/1.webp',
        id: '1231'
    },
    {
        name: 'kem',
        username: 'Phùng',
        image: '/slider-temp/2.webp',
        id: '1231'
    },
    {
        name: 'mixue',
        username: 'Như',
        image: '/slider-temp/3.webp',
        id: '1231'
    },
    {
        name: 'Phương',
        username: 'Ham ăn',
        image: '/slider-temp/4.webp',
        id: '1231'
    },
    {
        name: 'Trương Lợn',
        username: 'Ăn Lắm',
        image: '/slider-temp/5.webp',
        id: '1231'
    },
]
</script>

<template>
    <Splide 
        :options="{
            type: 'fade',
            rewind: true,
            perPage: 1,
            perMove: 1,
            arrows: false,
            drag: true,
            autoplay: true,
            interval: 3000,
            pauseOnHover: false,
            pauseOnFocus: false,
        }" 
        class="carousel" 
        aria-label="my-calrousel"
        @click="router.push(link);"
        @splide:active="update"
    >
        <SplideSlide 
            v-for="post in data" 
            class="single-slide" 
            :key="post.id"
        >
            <div class="slide-content" :style="{ backgroundImage: `url(${post.image}` }"></div>
        </SplideSlide>
        <div class="front-content text-center" @click.stop="">
            <p class="title">Nấu gì giờ ta?</p>
            <SearchForm />
            <p class="content">Món ngon mỗi ngày từ hàng triệu đầu bếp.</p>
        </div>
        <div class="info d-flex justify-content-between align-items-center">
            <div class="left">
                <p class="name d-inline">{{ name }}</p>
                <div class="dot d-inline-block"></div>
                <p class="onwer  d-inline">của {{ username }}</p>
            </div>
            <img src="@/assets/icons/right-arrow.png" alt="" srcset="" class="right">
        </div>
    </Splide>
</template>

<style scoped lang="scss">
p{
    margin: 0px;
    padding: 0px;
}
.carousel {
    width: 100%;
    height: 380px;
    background-color: black;
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    :deep(.splide__pagination){
        bottom: 40px !important;
    }
    .single-slide {
        .slide-content {
            width: 100%;
            height: 380px;
            background-size: cover;
            background-position: center;
            opacity: 0.75;
        }
    }

    .front-content {
        position: absolute;
        z-index: 1;
        width: 90%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        // text-align: center;
        .title{
            font-size: 30px;
            font-weight: 600;
        }
        .content{
            margin-top: 10px;
        }
    }
    .info{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 32px;
        bottom: 0;
        background-color: #242424;
        color: white;
        padding: 0px 10px;
        .left{
            .dot{
                width: 2px;
                height: 2px;
                margin: 0px 5px 3px;
                background-color: #ffffff;
            }
        }
        .right{
            height: 15px;
            width: auto;
            margin-bottom: 3px;
        }
    }
}
</style>