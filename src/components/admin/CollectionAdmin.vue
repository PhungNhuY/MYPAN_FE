<script setup lang="ts">
import type { ICollection } from '@/common/interfaces';
import PostProfile from '@/components/PostProfile.vue';
import router from '@/router';
import {deleteCollection} from '@/services/collection.service';

interface props {
    collection: ICollection;
}
const Props = defineProps<props>();

async function deleteColl(id: string){
    console.log(id);
    
    const ans = await deleteCollection(id);
    if(ans){
        window.location.reload();
    }
}
</script>

<template>
    <div class="wrapper">
        <!-- Modal box - show when cofirm report profile -->
        <div class="modal fade" :id="`deleteModal_${collection._id}`" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">Xóa bộ sưu tập</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="">Bạn không thể khôi phục lại sau khi đã xóa</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteColl(collection._id as string)">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10">
                <div class="collection">
                    <p class="category" :class="collection.category?.toString()">{{ collection.category }}</p>
                    <p class="name">{{ collection.name }}</p>
                    <div class="collapse" :id="`dt_${collection._id}`">
                        <div class="card card-body">
                            <img v-if="collection.category == 'season'" :src="collection.imageCoverLink" alt="" srcset=""
                                class="imageCover mb-2">
                            <div v-if="collection.posts?.length == 0" class="w-100 d-flex justify-content-center">
                                <img src="@/assets/images/not-found-1024.png" alt="" class="w-50 opacity-25">
                            </div>
                            <PostProfile v-else v-for="post in collection.posts" :key="post._id" :data="post" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2 feature d-flex flex-column justify-content-center">
                <router-link class="link" :to="`/admin/collection/update/${collection._id}`">
                    <button class="base-button">Sửa</button>
                </router-link>
                <button class="base-button btn-delete" data-bs-toggle="modal" :data-bs-target="`#deleteModal_${collection._id}`">Xóa</button>
                <button class="base-button" data-bs-toggle="collapse" :href="`#dt_${collection._id}`" role="button"
                    aria-expanded="false" :aria-controls="`dt_${collection._id}`">Chi tiết</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
p {
    margin: 0px;
    padding: 0px;
}
.link{
    text-decoration: none;
    color: black;
}

.wrapper {
    min-height: 100px;
    margin-bottom: 10px;
}

.base-button {
    width: 100%;
    height: 30px;
    border-radius: 6px;
    border: 1px solid #c6c6c6;
    margin-bottom: 5px;
}

.btn-delete{
    border: 1px solid red;
    color: red;
}

.feature {
    height: 100px;
}

.collection {
    min-height: 100px;
    background-color: #dddddd;
    border-radius: 10px;
    padding: 10px;

    .imageCover {
        border-radius: 10px;
    }

    .category {
        display: inline;
        padding-left: 7px;
        padding-right: 7px;
        border-radius: 99px;
    }

    .banner {
        color: blue;
        background-color: rgb(178, 178, 255);
    }

    .normal {
        color: #723900;
        background-color: #b3a190;
    }

    .season {
        color: green;
        background-color: rgb(166, 213, 166);
    }

    .name {
        margin-top: 10px;
        font-size: 18px;
        font-weight: 500;
    }
}
</style>