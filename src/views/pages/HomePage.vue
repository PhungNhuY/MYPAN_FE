<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { storeToRefs } from 'pinia';
import SliderAndSearch from '@/components/SliderAndSearch.vue';
import PostTopic from '@/components/PostTopic.vue';
import SeasonTopic from '@/components/SeasonTopic.vue';
import { useHomeStore } from '@/stores/home.store';

const authStore = useAuthStore();
const homeStore = useHomeStore();
const {collections} = storeToRefs(homeStore);
await homeStore.getAllActive();
</script>

<template>
    <div class="container wrapper">
        <div class="row">
            <div class="col-8 main-col">
                <SliderAndSearch />
                <div class="a" v-for="collection in collections" :key="collection._id">
                    <PostTopic v-if="collection.category == 'normal'" 
                        :title="collection.name"
                        :description="collection.description"
                        :posts="collection.posts" 
                    />
                    <SeasonTopic v-if="collection.category == 'season'" 
                        :title="collection.name"
                        :image-cover-link="collection.imageCoverLink"
                        :posts="collection.posts" 
                    />
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