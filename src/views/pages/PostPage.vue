<script setup lang="ts">
import MyCard from '@/components/MyCard.vue';
import { usePostStore } from '@/stores/post.store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import {useRoute} from 'vue-router';

const numOfLike = ref(100);
const isLike = ref(false);
function toggleLike() {
    isLike.value = !isLike.value;
    numOfLike.value += isLike.value ? 1 : -1;
}

const isFavorite = ref(false);
function toggleFavorite() {
    isFavorite.value = !isFavorite.value;
}

// get post id from route
const route = useRoute();
const postId = route.params.id as string;
console.log(postId);


const postStore = usePostStore();
await postStore.getPost(postId);
const {post} = storeToRefs(postStore);
</script>

<template>
    <div class="container wrapper">
        <div class="row">
            <div class="col-8 main-col">
                <img :src="post?.imageCoverLink" alt="" srcset="" class="image-cover">
                <MyCard :active="true" class="name-and-title">
                    <p class="name">{{ post?.name }}</p>
                    <p class="title">{{ post?.description }}</p>
                    <hr />
                    <div class="d-flex justify-content-around">
                        <div v-if="post?.ration" class="ration">
                            <img src="@/assets/icons/person.png" alt="" class="icon">
                            <p class="content">{{ post?.ration }} người</p>
                        </div>
                        <div v-if="post?.time" class="time">
                            <img src="@/assets/icons/clock.png" alt="" class="icon">
                            <p class="content">{{ post?.time }} phút</p>
                        </div>
                    </div>
                </MyCard>
                <MyCard class="ingredient">
                    <p class="title">Nguyên liệu</p>
                    <table class="the-table">
                        <tr>
                            <th class="pl-2">Nguyên liệu</th>
                            <th>Định lượng</th>
                        </tr>
                        <tr class="single-ingre" 
                            v-for="(ingre, index) in post?.ingredients" 
                            :key="index" 
                            :class="{ 'highlight': (index % 2 == 0) }"
                        >
                            <td class="pl-2">{{ ingre.name }}</td>
                            <td>{{ ingre.quantity }}</td>
                        </tr>
                    </table>
                </MyCard>
                <MyCard class="steps">
                    <p class="title">Cách làm</p>
                    <div class="single-step"
                        v-for="(step, index) in post?.steps" 
                        :key="index"
                    >
                        <div class="d-flex">
                            <div class="left">
                                <p class="order">{{ index }}</p>
                            </div>
                            <div class="right">
                                <p>{{ step.content }}</p>
                                <div class="images d-flex justify-content-around">
                                    <img 
                                        v-for="(imageLink, index) in step.imageLink"
                                        :key="index"
                                        :src="imageLink"
                                        alt=""
                                        srcset=""
                                        class="image"
                                        :class="`contain-${step.imageLink?.length}`"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </MyCard>
            </div>
            <div class="col-4 feature-col">
                <div class="feature-box">
                    <div class="box box-1">
                        <img src="/slider-temp/1.webp" alt="" srcset="" class="background">
                        <div class="avatar-and-name d-flex align-items-end">
                            <img src="/slider-temp/1.webp" alt="" srcset="" class="avatar">
                            <div class="pl-1">
                                <p class="name">
                                    Phung Nhu Y
                                </p>
                                <p class="username">@PhungNhuY</p>
                            </div>
                        </div>
                    </div>
                    <div class="box box-2">
                        <button class="button save" :class="{ 'save-active': isFavorite }" @click="toggleFavorite">
                            <img v-if="!isFavorite" src="@/assets/icons/bookmark-orange.png" class="icon" />
                            <img v-else src="@/assets/icons/bookmark.png" class="icon" />
                            {{ isFavorite ? 'Đã lưu' : 'Lưu' }}
                        </button>
                        <button class="button share">
                            <img src="@/assets/icons/share.png" class="icon" />
                            Chia sẻ
                        </button>
                        <button class="button report">
                            <img src="@/assets/icons/report.png" class="icon" />
                            Báo cáo món này
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
p {
    margin: 0px;
    padding: 0px;
}

.wrapper {
    max-width: 968px;
}

.main-col {}

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

        .box-1 {
            padding-bottom: 10px;

            .background {
                width: 100%;
                height: 150px;
                object-fit: cover;
                margin-bottom: 40px;
            }

            .avatar-and-name {
                position: absolute;
                top: 130px;
                left: 10px;

                .avatar {
                    width: 70px;
                    height: 70px;
                    border-radius: 99px;
                    object-fit: cover;
                    border: 3px solid white;
                }

                .name {
                    height: 20px;
                    color: black;
                    text-decoration: none !important;
                    font-size: 18px;
                    font-weight: 600;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:hover {
                        overflow: visible;
                        white-space: pre-line;
                    }
                }
                .username{
                    font-size: 12px;
                    color: #909090;
                    margin-bottom: 10px;
                }
            }
        }

        .box-2 {
            padding: 15px 10px;

            .button {
                border-radius: 6px;
                height: 35px;
                font-size: 18px;
                font-weight: 500;
                border: 1px solid #c6c6c6;
                margin-bottom: 5px;

                .icon {
                    width: 20px;
                    height: 20px;
                }
            }
            .save {
                width: 100%;
                color: #ffaa55;
                border: 1px solid #ffaa55;
            }

            .save-active {
                background-color: #ffaa55;
                color: white;
            }
            
            .share{
                width: 100%;
            }
            .report{
                width: 100%;
            }

            // .like {
            //     color: #e86a92;
            //     border: 1px solid #ee8787;
            // }

            // .like-active {
            //     color: #d41919;
            //     background-color: #ee8787;
            // }

        }
    }
}

.image-cover {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 5px 5px 0px #c6c6c6;
}

.name-and-title {
    .name {
        font-size: 40px;
    }

    .title {
        font-size: 18px;
    }

    .ration,
    .time {
        display: flex;
        align-items: center;

        .icon {
            width: 20px;
            height: 20px;
            margin-top: -5px;
        }

        .content {
            font-size: 20px;
            margin-left: 5px;
        }
    }
}

.ingredient {
    .the-table {
        width: 100%;

        tr {
            width: 100%;
            height: 30px;

            td {
                width: 50%;
            }
        }
    }

    .title {
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .single-ingre {
        font-size: 16px;

        &:hover {
            background-color: #ffddbc;
            font-weight: 500;
        }
    }

    .highlight {
        background-color: #f4f4f4;
    }
}

.steps {
    .title {
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .single-step {
        margin-bottom: 15px;

        .left {
            padding-right: 5px;

            .order {
                text-align: center;
                font-size: 18px;
                font-weight: 600;
                color: white;
                background-color: #ffaa55;
                width: 24px;
                height: 24px;
                border-radius: 99px;
            }
        }

        .images {
            margin-top: 5px;
            margin-bottom: 20px;
            .image {
                border-radius: 10px;
                max-height: 300px;
            }

            .contain-1 {
                max-width: 100%;
            }

            .contain-2 {
                max-width: 49%;
            }

            .contain-3 {
                max-width: 32%;
            }
        }
    }
}
</style>