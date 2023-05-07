<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import SearchForm from './SearchForm.vue';
import { ref } from 'vue';
import router from '@/router';
import type { IPost } from '@/common/interfaces';

const link = ref('#');
const name = ref('');
const fullname = ref('');

function update(splide: any){
    link.value = `/post/${data[splide.index]._id}`;
    name.value = data[splide.index].name as string;
    fullname.value = data[splide.index].author?.fullname as string;
}
const data: IPost[] = [
    {
        name: 'Bánh Tráng trộng',
        author:{
            fullname: 'Phùng Như Ý',
        },
        imageCoverLink: '/slider-temp/1.webp',
        _id: '1231'
    },
    {
        name: 'kem',
        author:{
            fullname: 'Phùng',
        },
        imageCoverLink: '/slider-temp/2.webp',
        _id: '1231'
    },
    {
        name: 'mixue',
        author:{
            fullname: 'Như',
        },
        imageCoverLink: '/slider-temp/3.webp',
        _id: '1231'
    },
    {
        name: 'Phương',
        author:{
            fullname: 'Ham ăn',
        },
        imageCoverLink: '/slider-temp/4.webp',
        _id: '1231'
    },
    {
        name: 'Trương Lợn',
        author:{
            fullname: 'Ăn Lắm',
        },
        imageCoverLink: '/slider-temp/5.webp',
        _id: '1231'
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
            :key="post._id"
        >
            <div 
                class="slide-content" 
                :style="{ 
                    backgroundImage: `linear-gradient(
                        rgba(0, 0, 0, 0.25), 
                        rgba(0, 0, 0, 0.25)
                    ),url(${post.imageCoverLink}` 
                }"
            ></div>
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
                <p class="onwer  d-inline">của {{ fullname }}</p>
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