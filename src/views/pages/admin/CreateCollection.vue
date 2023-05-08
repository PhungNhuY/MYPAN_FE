<script setup lang="ts">
import { ref } from 'vue';
import MyCard from '@/components/MyCard.vue';
import { uploadImage } from '@/services/image.service';
import type { ICreateCollection } from '@/common/interfaces';
import {createCollection} from '@/services/collection.service';
import router from '@/router';

const category = ref<String>('normal')
const imageCoverLink = ref<String | null>(null);
const name = ref<String>('');
const des = ref<String>('');
const postIds = ref<String[]>(['']);

function addPost(pos: number){
    postIds.value.splice(pos+1, 0, '');
}

function removePost(pos: number){
    if(postIds.value.length >1){
        postIds.value.splice(pos, 1);
    }
}

// handle upload image cover
const inputImage = ref(null);
async function pickImageCover() {
    if (inputImage.value) {
        let file = inputImage.value.files;
        if (file && file[0]) {
            // upload image here
            const imageLink = await uploadImage(file[0]);
            imageCoverLink.value = imageLink;
        }
    }
}
function selectImage() {
    if (inputImage.value) {
        inputImage.value.click();
    }
}
function removeCurrentImageCover() {
    imageCoverLink.value = null;
}

async function create() {

    const data: ICreateCollection = {
        category: category.value as string,
        name: name.value as string,
        description: des.value as string,
        posts: postIds.value as string[],
        imageCoverLink: imageCoverLink.value as string,
        status: 'activated',
    }
    console.log(data);
    
    const ans = await createCollection(data);
    if(ans) router.push('/admin/collection');
}
</script>

<template>
    <div class="container wrapper">
        <h2 class="head-title">Tạo bộ sưu tập mới</h2>
        <MyCard class="base-info">
            <div class="image-cover d-flex justify-content-center my-5">
                <div class="d-flex flex-column justify-content-center align-items-center"
                    :style="{ 'background-image': `url(${imageCoverLink})` }"
                    :class="imageCoverLink == null ? 'image-cover-preview' : 'has-image'" @click="selectImage">
                    <img v-if="imageCoverLink == null" src="@/assets/icons/add-gray.png" alt="" srcset="" class="icon">
                    <p v-if="imageCoverLink == null" class="title">Ảnh bìa</p>
                    <img v-else src="@/assets/icons/cancel-red.png" alt="" srcset="" class="image-cancel-button"
                        @click.stop="removeCurrentImageCover">
                </div>
                <input class="d-none" ref="inputImage" type="file" @input="pickImageCover">
            </div>
            <div class="row">
                <div class="col-6 pb-3">
                    <p class="name">Phân loại</p>
                    <select class="form-select" name="" id="" v-model="category">
                        <option value="normal">normal</option>
                        <option value="banner">banner</option>
                        <option value="season">season</option>
                    </select>
                    <p class="name">Tên bộ sưu tập</p>
                    <input class="base-input" type="text" placeholder="Nhập tên món ăn" v-model="name">
                </div>
                <div class="col-7">
                    <p class="description">Mô tả</p>
                    <textarea class="base-textarea description-content" rows="3" v-model="des"></textarea>
                </div>
            </div>
        </MyCard>

        <MyCard class="ingre">
            <p class="title">Bài viết</p>
            <div class="row">
                <div class="col-6">Mã bài viết</div>
            </div>
            <div v-for="(postId, index) in postIds" :key="index" class="row mb-2">
                <div class="col-6">
                    <input class="base-input" type="text" placeholder="Nhập mã bài viết" v-model="postIds[index]">
                </div>
                <div class="col-1 d-flex justify-content-around">
                    <button class="base-button add-button" @click="addPost(index)">
                        <img src="@/assets/icons/add-green.png" alt="" srcset="" class="icon">
                    </button>
                    <button v-if="postIds.length > 1" class="base-button remove-button" @click="removePost(index)">
                        <img src="@/assets/icons/cancel-red.png" alt="" srcset="" class="icon">
                    </button>
                </div>
            </div>
        </MyCard>
        <div class="buttons d-flex justify-content-center">
            <router-link class="link" to="/admin/collection">
                <button class="base-button cancel-button">Hủy</button>
            </router-link>
            <button class="base-button create-button" @click="create">Đăng</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
p,
h2 {
    margin: 0px;
    padding: 0px;
}

.link{
    text-decoration: none;
    color: black;
}

.form-control:focus {
    box-shadow: none;
}

.wrapper {
    max-width: 968px;
}

.head-title {
    text-align: center;
}

.base-input {
    border: 1px solid #c6c6c6;
    border-radius: 8px;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
}

.base-button {
    height: 40px;
    border-radius: 12px;
    background-color: white;
    border: 1px solid #c6c6c6;

    &:hover {
        scale: 1.05;
    }
}

.base-textarea {
    border: 1px solid #c6c6c6;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
}

.base-info {
    .description-content {
        height: 111px;
    }

    .image-cover {
        .image-cover-preview {
            color: #666666;

            .icon {
                width: 20px;
                height: 20px;
            }

            .title {
                text-align: center;
            }
        }

        .has-image {
            position: relative;
            border-radius: 10px;
            width: 350px;
            height: 200px;
            background-size: cover;

            .image-cancel-button {
                width: 25px;
                height: 25px;
                position: absolute;
                top: -10px;
                right: -10px;
                z-index: 1;
            }
        }
    }
}

.ingre {
    &>.title {
        font-size: 20px;
        font-weight: 500;
    }

    .add-button {
        border: unset;

        .icon {
            width: 25px;
            height: 25px;
        }
    }

    .remove-button {
        border: unset;

        .icon {
            width: 21px;
            height: 21px;
        }
    }
}

.steps {
    &>.title {
        font-size: 20px;
        font-weight: 500;
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

        .right {
            width: 90%;
            margin-right: 5px;
        }

        .add-remove {
            .add-button {
                border: unset;

                .icon {
                    width: 25px;
                    height: 25px;
                }
            }

            .remove-button {
                border: unset;

                .icon {
                    width: 21px;
                    height: 21px;
                }
            }
        }

        .image-step {
            width: 100px;
            height: 100px;
            border: 1px solid #c6c6c6;
            border-radius: 10px;

            .icon {
                width: 20px;
                height: 20px;
            }

            .image-cancel-button {}

            .image-preview {
                color: #666666;

                .icon {
                    width: 20px;
                    height: 20px;
                }

                .title {
                    text-align: center;
                }
            }

            .has-image {
                position: relative;
                border-radius: 10px;
                width: 100px;
                height: 100px;
                background-size: cover;

                .image-cancel-button {
                    width: 15px;
                    height: 15px;
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    z-index: 1;
                }
            }
        }
    }
}

.buttons {
    margin-top: 10px;
    font-weight: 500;
    font-size: 20px;

    .create-button {
        width: 100px;
        margin-left: 10px;
        background-color: #ffaa55;
        border: 1px solid #ffaa55;
    }

    .cancel-button {
        width: 100px;
        border: 1px solid #ffaa55;
    }
}</style>