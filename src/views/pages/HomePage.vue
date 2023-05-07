<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { storeToRefs } from 'pinia';
import SliderAndSearch from '@/components/SliderAndSearch.vue';
import PostTopic from '@/components/PostTopic.vue';

const authStore = useAuthStore();
</script>

<template>
    <div class="container wrapper">
        <div class="row">
            <div class="col-8 main-col">
                <SliderAndSearch />
                <div class="a" v-for="i in 5" :key="i">
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
                </div>
            </div>
            <div class="col-4 feature-col">
                <div class="feature-box">
                    <div class="box box-2">
                        <router-link class="link" to="/post/create">
                            <button class="button btn-active">Tạo món ăn mới</button>
                        </router-link>
                        <button class="button share">
                            <img src="@/assets/icons/bookmark-black.png" class="icon" />
                            Các món ăn đã lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper{
    max-width: 968px;
}
.main-col {
}

.link{
    text-decoration: none;
    color: black;
}

.feature-col {
    .feature-box {
        position: sticky;
        top: 70px;

        .box {
            border-radius: 10px;
            background-color: white;
            box-shadow: 0px 5px 5px 0px #c6c6c6;
            overflow: hidden;
            margin-bottom: 10px;
        }

        .box-2{
            padding: 15px 10px;
            .button {
                border-radius: 6px;
                height: 35px;
                font-size: 18px;
                font-weight: 500;
                border: 1px solid #c6c6c6;
                margin-bottom: 5px;
                width: 100%;

                .icon {
                    width: 20px;
                    height: 20px;
                }
            }
            .btn-active {
                background-color: #ffaa55;
                color: white;
                border: none;
            }
        }
    }
}
</style>