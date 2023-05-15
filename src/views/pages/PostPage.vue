<script setup lang="ts">
import MyCard from '@/components/MyCard.vue';
import { usePostStore } from '@/stores/post.store';
import { useAuthStore } from '@/stores/Auth.store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useReportStore } from '@/stores/report.store';

// get post id from route
const route = useRoute();
const postId = route.params.id as string;

const postStore = usePostStore();
await postStore.getPost(postId);
const { post, numOfLike, isLike, isSaved } = storeToRefs(postStore);

const authStore = useAuthStore();
const currentUser = authStore.user;
function report() {
    // useReportStore().createReport(postId);
    const reportStore = useReportStore();
    reportStore.createReport(postId);
}

postStore.checkIsLike(postId);
postStore.getNumOfLike(postId);
function toggleLike() {
    // isLike.value = !isLike.value;
    // numOfLike.value += isLike.value ? 1 : -1;

    if(isLike.value){
        postStore.unlike(postId);
    }else{
        postStore.like(postId);
    }
}

postStore.checkIsSaved(postId);
function toggleFavorite() {
    // isSaved.value = !isSaved.value;
    if(isSaved.value){
        postStore.unsave(postId);
    }else{
        postStore.save(postId);
    }
}
</script>

<template>
    <!-- Modal box - show when cofirm report post -->
    <div class="modal fade" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="reportModalLabel">Báo cáo món ăn</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="">Hãy báo cáo nếu bạn cho rằng món ăn này vị phạm quy định của chúng tôi!</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="report">Báo cáo</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal box - show when cofirm delete post -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xác nhận xóa</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="">Bạn có muốn xóa vĩnh viễn món ăn này?</p>
                    <p class="">Lưu ý: món ăn không thể khôi phục sau khi đã xóa.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="postStore.deletePost(post?._id as string)">Xóa</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container wrapper">
        <div class="row">
            <div class="col-8 main-col">
                <img v-if="post?.imageCoverLink" :src="post?.imageCoverLink" alt="" srcset="" class="image-cover">
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
                        <tr class="single-ingre" v-for="(ingre, index) in post?.ingredients" :key="index"
                            :class="{ 'highlight': (index % 2 == 0) }">
                            <td class="pl-2">{{ ingre.name }}</td>
                            <td>{{ ingre.quantity }}</td>
                        </tr>
                    </table>
                </MyCard>
                <MyCard class="steps">
                    <p class="title">Cách làm</p>
                    <div class="single-step" v-for="(step, index) in post?.steps" :key="index">
                        <div class="d-flex">
                            <div class="left">
                                <p class="order">{{ index + 1 }}</p>
                            </div>
                            <div class="right">
                                <p class="enable-endline">{{ step.content }}</p>
                                <div class="images d-flex justify-content-around">
                                    <img v-for="(imageLink, index) in step.imageLink" :key="index" :src="imageLink" alt=""
                                        srcset="" class="image" :class="`contain-${step.imageLink?.length}`">
                                </div>
                            </div>
                        </div>
                    </div>
                </MyCard>
            </div>
            <div class="col-4 feature-col">
                <div class="feature-box">
                    <div class="box box-1">
                        <img v-if="post?.author?.imageCoverLink" :src="post?.author?.imageCoverLink" alt="" srcset=""
                            class="background">
                        <img v-else src="@/assets/images/not-found-512.png" alt="" srcset=""
                            class="background opacity-25 not-found" />
                        <div class="avatar-and-name d-flex align-items-end">
                            <img v-if="post?.author?.avatar_link" :src="post?.author?.avatar_link" alt="" srcset=""
                                class="avatar">
                            <img v-else src="@/assets/images/default-avatar.jpg" alt="" srcset="" class="avatar">
                            <div class="pl-1">
                                <router-link class="link" :to="`/profile/${post?.author?.username}`">
                                    <p class="name">
                                        {{ post?.author?.fullname }}
                                    </p>
                                </router-link>
                                <p class="username">@{{ post?.author?.username }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="box box-2">
                        <button v-if="post?.author?._id != currentUser?.id" class="button like"
                            :class="{ 'like-active': isLike }" @click="toggleLike">
                            <img v-if="!isLike" src="@/assets/icons/heart-black.png" class="icon" />
                            <img v-else src="@/assets/icons/heart-red.png" class="icon" />
                            {{ numOfLike }}
                        </button>
                        <button v-if="post?.author?._id != currentUser?.id" class="button save"
                            :class="{ 'save-active': isSaved }" @click="toggleFavorite">
                            <img v-if="!isSaved" src="@/assets/icons/bookmark-orange.png" class="icon" />
                            <img v-else src="@/assets/icons/bookmark.png" class="icon" />
                            {{ isSaved ? 'Đã lưu' : 'Lưu' }}
                        </button>
                        <button class="button share">
                            <img src="@/assets/icons/share.png" class="icon" />
                            Chia sẻ
                        </button>
                        <button v-if="post?.author?._id != currentUser?.id" class="button report" data-bs-toggle="modal"
                            data-bs-target="#reportModal">
                            <img src="@/assets/icons/report.png" class="icon" />
                            Báo cáo món này
                        </button>
                        <router-link class="link" :to="`/post/update/${post?._id}`">
                            <button v-if="post?.author?._id == currentUser?.id" class="button share">
                                <img src="@/assets/icons/writing-black.png" class="icon" />
                                Cập nhật món ăn
                            </button>
                        </router-link>
                        <button v-if="post?.author?._id == currentUser?.id" class="button delete" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            <img src="@/assets/icons/delete-red.png" class="icon" />
                            Xóa món ăn
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

.link {
    text-decoration: none;
    color: black;
}

.enable-endline {
    white-space: pre-line;
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

            .not-found {
                object-fit: contain;
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

                .username {
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

            .like{
                width: 100%;
                color: #000000;
                border: 1px solid #FC4F4F;
            }
            .like-active{
                width: 100%;
                color: #FC4F4F;
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

            .share {
                width: 100%;
            }

            .report {
                width: 100%;
            }

            .delete {
                width: 100%;
                color: #bb2e2e;
                border: 1px solid #bb2e2e;
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
}</style>