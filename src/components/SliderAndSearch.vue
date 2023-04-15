<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import SearchForm from './SearchForm.vue';
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
            pauseOnFocus: false
        }" 
        class="carousel" 
        aria-label="my-calrousel"
    >
        <SplideSlide v-for="index in 5" class="single-slide" :key="index">
            <div class="slide-content" :style="{ backgroundImage: `url(slider-temp/${index}.webp` }"></div>
        </SplideSlide>
        <div class="front-content text-center">
            <p class="title">Nấu gì giờ ta?</p>
            <SearchForm />
            <p class="content">Món ngon mỗi ngày từ hàng triệu đầu bếp.</p>
        </div>
        <div class="info d-flex justify-content-between align-items-center">
            <div class="left">
                <p class="name d-inline">Bánh tráng trộn</p>
                <div class="dot d-inline-block"></div>
                <p class="onwer  d-inline">Phùng Như Ý</p>
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