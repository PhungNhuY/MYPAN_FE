<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { storeToRefs } from 'pinia';
import SliderAndSearch from '@/components/SliderAndSearch.vue';
import PostTopic from '@/components/PostTopic.vue';

const authStore = useAuthStore();
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-7 offset-1 main-col">
                <SliderAndSearch />
                <PostTopic title="Xoài vào mùa siêu rẻ, thử ngay các món ngon mới lạ này."
                    description="Xoài là trái có thể ăn từ sống tới chín. Xòa xanh trộn gỏi, xoài chín làm salsa, bánh, chè... Bạn đã thử xoài hườm xào cay chưa?"
                    :post-cards="[
                        {
                            id: '1234',
                            imageCover: '/slider-temp/1.webp',
                            postName: 'Sườn non hảo hạng',
                            username: 'Phung Nhu Y',
                            userAvatar: null,
                            like: 100,
                            isLike: false,
                            isFavotire: false,
                        },
                        {
                            id: '1231',
                            imageCover: '/slider-temp/2.webp',
                            postName: 'Sườn non hảo hạng',
                            username: 'Phung Nhu Y',
                            userAvatar: null,
                            like: 100,
                            isLike: false,
                            isFavotire: false,
                        },
                        {
                            id: '1232',
                            imageCover: '/slider-temp/3.webp',
                            postName: 'Sườn non hảo hạng',
                            username: 'Phung Nhu Y',
                            userAvatar: null,
                            like: 100,
                            isLike: false,
                            isFavotire: false,
                        },
                        {
                            id: '1233',
                            imageCover: '/slider-temp/4.webp',
                            postName: 'Sườn non hảo hạng',
                            username: 'Phung Nhu Y',
                            userAvatar: null,
                            like: 100,
                            isLike: false,
                            isFavotire: false,
                        },
                        {
                            id: '1235',
                            imageCover: '/slider-temp/5.webp',
                            postName: 'Sườn non hảo hạng',
                            username: 'Phung Nhu Y',
                            userAvatar: null,
                            like: 100,
                            isLike: false,
                            isFavotire: false,
                        }
                    ]" />
                <!-- <PostCard :post-card="{
                        id: '1234',
                        imageCover: '/slider-temp/1.webp',
                        postName: 'Sườn non hảo hạng',
                        username: 'Phung Nhu Y',
                        userAvatar: null,
                        like: 100,
                        isLike: false,
                        isFavotire: false,
                    }"/> -->
            </div>
            <div class="col-3 feature-col">
                adbe
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-col {
    margin-right: 10px;
}

.feature-col {
    background-color: black;
}
</style>