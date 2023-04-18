<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import PostCard from './PostCard.vue';
</script>

<template>
    <div class="topic-wrapper">
        <p class="title">Xoài vào mùa siêu rẻ, thử ngay các món ngon mới lạ này.</p>
        <p class="description">Xoài là trái có thể ăn từ sống tới chín. Xòa xanh trộn gỏi, xoài chín làm salsa, bánh, chè... Bạn đã thử xoài hườm xào cay chưa?</p>
        <Splide
            :options="{
                rewind: true,
                perPage: 2.5,
                perMove: 1,
                arrows: true,
                pagination: false,
                drag: true,
            }" 
            class="carousel" 
            aria-label="my-calrousel"
        >
            <SplideSlide
                v-for="index in 10" 
                class="single-slide" 
                :key="index"
            >
                <PostCard :post-card="{
                    id: '1234',
                    imageCover: '/slider-temp/1.webp',
                    postName: 'Sườn non hảo hạng',
                    username: 'Phung Nhu Y',
                    userAvatar: null,
                    like: 100,
                    isLike: false,
                    isFavotire: false,
                }"/>
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
    margin-top: 15px;
    padding: 15px 16px;
    border-radius: 16px;
    width: 100%;
    border: 1px solid #E7E7EC;
    background-color: #FFFFFF;
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
        background: #ffaa55;
    }
    :deep(.splide__arrow--next){
        right: -1em;
        width: 2.5em;
        height: 2.5em;
        background: #ffaa55;
    }
}
.single-slide{
    margin-right: 10px;
    width: 230px !important;
}
</style>