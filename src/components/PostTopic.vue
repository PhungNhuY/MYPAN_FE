<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import PostCard from './PostCard.vue';
import type { IPostCard } from '@/common/interfaces';

interface props{
    title: string;
    description: string;
    postCards: IPostCard[];
}
const Props = defineProps<props>();
</script>

<template>
    <div class="topic-wrapper">
        <p class="title">{{ title }}</p>
        <p class="description">{{ description }}</p>
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
                v-for="post in postCards" 
                class="single-slide" 
                :key="post.id"
            >
                <PostCard :post-card="post"/>
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
    margin-top: 30px;
    padding: 15px 16px;
    border-radius: 16px;
    width: 100%;
    border: 2px solid #d6d6d6;
    background-color: #FFFFFF;
    box-shadow: 0px 5px 5px 0px #c6c6c6;
}
.title{
    font-size: 25px;
    font-weight: 500;
}

.carousel{
    width: 100%;
    :deep(.splide__arrow--prev){
        left: -1em;
        width: 2.5em;
        height: 2.5em;
        // background: #ffaa55;
    }
    :deep(.splide__arrow--next){
        right: -1em;
        width: 2.5em;
        height: 2.5em;
        // background: #ffaa55;
    }
}
.single-slide{
    margin-right: 10px;
    width: 230px !important;
}
</style>