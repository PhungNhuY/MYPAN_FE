<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import PostCardTopic from './PostCardTopic.vue';
import type { IPost } from '@/common/interfaces';

interface props{
    title: string;
    imageCoverLink: string;
    posts: IPost[];
}
const Props = defineProps<props>();
</script>

<template>
    <div class="topic-wrapper">
        <div class="cover">
            <img :src="imageCoverLink" alt="" srcset="" class="image-cover">
            <p class="title">{{ title }}</p>
        </div>
        <Splide
            :options="{
                type:'loop',
                rewind: true,
                // perPage: 2.5,
                // perMove: 1,
                arrows: true,
                pagination: false,
                drag: true,
            }" 
            class="carousel" 
            aria-label="my-calrousel"
        >
            <SplideSlide
                v-for="post in posts" 
                class="single-slide" 
                :key="post._id"
            >
                <PostCardTopic :post="post"/>
            </SplideSlide>
        </Splide>
    </div>
</template>

<style scoped lang="scss">
p{
    margin: 0px;
    padding: 0px;
}
.topic-wrapper{
    overflow: hidden;
    margin-top: 30px;
    padding-bottom: 15px;
    border-radius: 16px;
    width: 100%;
    border: 2px solid #d6d6d6;
    background-color: #f0f0f0;
    box-shadow: 0px 5px 5px 0px #c6c6c6;
}
.cover{
    position: relative;
    margin-bottom: 10px;
    background-color: black;
    height: 250px;
    .image-cover{
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 75%;
    }
    .title{
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translate(-50%, 0%);
    }
}
.title{
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    color: #ffffff;
}

.carousel{
    width: 100%;
    padding: 0px 15px;
    :deep(.splide__arrow--prev){
        left: 0.5em;
        width: 2.5em;
        height: 2.5em;
        // background: #ffaa55;
    }
    :deep(.splide__arrow--next){
        right: 0.5em;
        width: 2.5em;
        height: 2.5em;
        // background: #ffaa55;
    }
}
.single-slide{
    margin-right: 10px;
    width: 150px !important;
}
</style>