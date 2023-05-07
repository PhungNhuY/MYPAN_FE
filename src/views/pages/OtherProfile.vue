<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/Auth.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {getProfile} from '@/services/profile.service';
import MyCard from '@/components/MyCard.vue';
import PostProfile from '@/components/PostProfile.vue';
import { usePostStore } from '@/stores/post.store';
import { storeToRefs } from 'pinia';
import { showSuccessNotificationFunction } from '@/common/helper';

// get post id from route
const route = useRoute();
const username = route.params.username as string;
const currentUser = useAuthStore().user;

if(username == currentUser?.username){
    router.push('/profile');
}

// use for switch beetween 2 tab
const currentTab = ref(1);

const user = await getProfile(username);

const postStore = usePostStore();
const {listOfPost, numOfPage, currentPage, isLoading} = storeToRefs(postStore);
listOfPost.value = [];
currentPage.value = 1;
await postStore.getListOfPost(user?.id, currentPage.value);

function getNextPosts() {
    window.onscroll = async () => {
        window.onscroll = async () => {
            if ( (window.scrollY + window.innerHeight >= document.body.scrollHeight)  ) {
                // console.log('fired');
                if(currentPage.value<numOfPage.value){
                    currentPage.value++;
                    isLoading.value = true;
                    await postStore.getListOfPost(user?.id, currentPage.value);
                }
            }
        }
    }
}
onMounted(() => {
    getNextPosts();
})

function report(){
    showSuccessNotificationFunction('Đã báo cáo tài khoản. Cảm ơn vì những đóng góp của bạn.')
}
</script>

<template>
    <!-- Modal box - show when cofirm report profile -->
    <div class="modal fade" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reportModalLabel">Báo cáo tài khoản</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="">Hãy báo cáo nếu bạn cho rằng tài khoản này vị phạm quy định của chúng tôi!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="report">Báo cáo</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container wrapper">
        <div class="row">
            <div class="col-8 main-col">
                <MyCard class="main-card">
                    <v-tabs class="tab-header" v-model="currentTab">
                        <v-tab class="left" value="one">Món của {{ user?.fullname }}</v-tab>
                    </v-tabs>
                    <div class="p-3">
                        <v-window v-model="currentTab" class="windows">
                            <v-window-item value="one" class="window-one">
                                <div v-if="listOfPost?.length == 0" class="w-100 d-flex justify-content-center">
                                    <img src="@/assets/images/not-found-1024.png" alt="" class="w-50 opacity-25">
                                </div>
                                <PostProfile
                                    v-else
                                    v-for="post in listOfPost"
                                    :key="post._id"
                                    :data="post"
                                />
                            </v-window-item>
                        </v-window>
                    </div>
                </MyCard>
            </div>
            <div class="col-4 feature-col">
                <div class="feature-box">
                    <div class="box box-1">
                        <img v-if="user?.imageCoverLink" :src="user?.imageCoverLink" alt="" srcset="" class="background"/>
                        <img v-else src="@/assets/images/not-found-512.png" alt="" srcset="" class="background opacity-25 not-found"/>
                        <div class="avatar-and-name d-flex align-items-end">
                            <img v-if="user?.avatar_link" :src="user?.avatar_link" alt="" srcset="" class="avatar">
                            <img v-else src="@/assets/images/not-found-512.png" alt="" srcset="" class="avatar opacity-25">
                            <div class="pl-1">
                                <p class="name">
                                    {{ user?.fullname }}
                                </p>
                                <p class="username">@{{ user?.username }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="box box-2">
                        <button class="button report" data-bs-toggle="modal" data-bs-target="#reportModal">
                            <img src="@/assets/icons/report.png" class="icon"/>
                            Báo cáo vi phạm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">p {
    margin: 0px;
    padding: 0px;
}

.wrapper {
    max-width: 968px;
}
.link{
    text-decoration: none;
    color: black;
}

.main-col {}

.main-card {
    padding: 0px;
    overflow: hidden;
}

.tab-header {
    width: 100%;

    :deep(.v-slide-group__content) {
        .v-btn {
            width: 100%;
            background-color: #ffaa55;
            border-radius: 0px;
        }

        .v-slide-group-item--active {
            background-color: white;
            // box-shadow: inset 0px 7px 5px -7px rgba(0, 0, 0, 0.4);
        }

        .v-slide-group-item--active.left{
            // box-shadow: 
            //     inset -7px 0px 5px -7px rgba(0, 0, 0, 0.4),
            //     inset 0px 7px 5px -7px rgba(0, 0, 0, 0.4),
            //     inset 7px 0px 5px -7px rgba(0, 0, 0, 0.4),
            // ;
        }
        .v-slide-group-item--active.right{
            box-shadow: 
                inset 7px 0px 5px -7px rgba(0, 0, 0, 0.4),
                inset 0px 7px 5px -7px rgba(0, 0, 0, 0.4),
            ;
        }

        .v-tab__slider {
            display: none;
        }
    }
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

        .box-1 {
            padding-bottom: 10px;

            .background {
                width: 100%;
                height: 150px;
                object-fit: cover;
                margin-bottom: 40px;
            }
            .not-found{
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