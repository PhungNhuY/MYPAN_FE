<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';// Default theme
import '@splidejs/vue-splide/css';
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
            autoplay: false,
            interval: 3000,
            pauseOnHover: false,
            pauseOnFocus: false
        }" 
        class="carousel"
        aria-label="my-calrousel"
    >
        <SplideSlide class="single-slide">
            <div 
                class="slide-content" 
                style="background-image: url(../../public/slider-temp/1.webp); "
            >
            </div>
        </SplideSlide>
        <SplideSlide class="single-slide">
            <div 
                class="slide-content" 
                style="background-image: url(../../public/slider-temp/2.webp); "
            >
            </div>
        </SplideSlide>
        <SplideSlide class="single-slide">
            <div 
                class="slide-content" 
                style="background-image: url(../../public/slider-temp/3.webp); "
            >
            </div>
        </SplideSlide>
        <SplideSlide class="single-slide">
            <div 
                class="slide-content" 
                style="background-image: url(../../public/slider-temp/4.webp); "
            >
            </div>
        </SplideSlide>
        <SplideSlide class="single-slide">
            <div 
                class="slide-content" 
                style="background-image: url(../../public/slider-temp/5.webp); "
            >
            </div>
        </SplideSlide>
    </Splide>
</template>

<style scoped lang="scss">
.carousel{
    width: 100%;
    height: 380px;
    .single-slide{
        .slide-content{
            width: 100%;
            height: 380px;
            background-size: cover;
            background-position: center;
        }
    }
}
</style>