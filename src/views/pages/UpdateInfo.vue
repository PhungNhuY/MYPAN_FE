<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { storeToRefs } from 'pinia';
import MyCard from '@/components/MyCard.vue';
import { ref } from 'vue';
import { uploadImage } from '@/services/image.service';
import type { IUser } from '@/common/interfaces';
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const imageCoverLink = ref<String | null>(user.value?.imageCoverLink as string);
const avatar_link = ref<String | null>(user.value?.avatar_link as string);
const fullname = ref<String>(user.value?.fullname as string);

// handle upload image cover
const inputImageCover = ref(null);
async function pickImageCover() {
    if (inputImageCover.value) {
        let file = inputImageCover.value.files;
        if (file && file[0]) {
            // upload image here
            const imageLink = await uploadImage(file[0]);
            imageCoverLink.value = imageLink;
        }
    }
}
function selectImage() {
    if (inputImageCover.value) {
        inputImageCover.value.click();
    }
}
function removeCurrentImageCover() {
    imageCoverLink.value = null;
}

// handle upload avatar
const inputAvatar = ref(null);
async function pickAvatar() {
    if (inputAvatar.value) {
        let file = inputAvatar.value?.files;
        if (file && file[0]) {
            // upload image here
            const imageLink = await uploadImage(file[0]);
            avatar_link.value = imageLink;
        }
    }
}
function selectAvatar() {
    if (inputAvatar.value) {
        inputAvatar.value.click();
    }
}
function removeCurrentAvatar() {
    avatar_link.value = null;
}


function update() {
    const data: IUser = {
        imageCoverLink: imageCoverLink.value as string,
        avatar_link: avatar_link.value as string,
        fullname: fullname.value as string,
    };
    authStore.updateInfo(data);
    // console.log(data);
}
</script>
<template>
    <div class="container wrapper">
        <h2 class="head-title">Cập nhật thông tin cá nhân</h2>
        <MyCard>
            <div class="image-cover d-flex justify-content-center">
                <div class="d-flex flex-column justify-content-center align-items-center"
                    :style="{ 'background-image': `url(${imageCoverLink})` }"
                    :class="imageCoverLink == null ? 'image-cover-preview' : 'has-image'" @click="selectImage">
                    <img v-if="imageCoverLink == null" src="@/assets/icons/add-gray.png" alt="" srcset="" class="icon">
                    <p v-if="imageCoverLink == null" class="title">Ảnh bìa</p>
                    <img v-else src="@/assets/icons/cancel-red.png" alt="" srcset="" class="image-cancel-button"
                        @click.stop="removeCurrentImageCover">
                </div>
                <input class="d-none" ref="inputImageCover" type="file" @input="pickImageCover">
            </div>
            <div class="row">
                <div class="col-6 pt-2">
                    <div class="avatar d-flex justify-content-center align-items-center">
                        <div class="d-flex flex-column justify-content-center align-items-center"
                            :style="{ 'background-image': `url(${avatar_link})` }"
                            :class="avatar_link == null ? 'avatar-preview' : 'has-image'" @click="selectAvatar">
                            <img v-if="avatar_link == null" src="@/assets/icons/add-gray.png" alt="" srcset=""
                                class="icon">
                            <p v-if="avatar_link == null" class="title">Ảnh đại diện</p>
                            <img v-else src="@/assets/icons/cancel-red.png" alt="" srcset="" class="image-cancel-button"
                                @click.stop="removeCurrentAvatar">
                        </div>
                        <input class="d-none" ref="inputAvatar" type="file" @input="pickAvatar">
                    </div>
                </div>
                <div class="col-6 pt-2">
                    <p class="">Email</p>
                    <input class="base-input" type="text" disabled :value="user?.email" />
                    <p class="pt-2">Id tài khoản</p>
                    <input class="base-input" type="text" disabled :value="`@${user?.username}`" />
                    <p class="pt-2">Họ tên</p>
                    <input class="base-input" type="text" v-model="fullname" />
                </div>
            </div>
        </MyCard>
        <div class="buttons d-flex justify-content-center">
            <router-link class="link" to="/profile">
                <button class="base-button cancel-button">Hủy</button>
            </router-link>
            <button class="base-button create-button" @click="update">Cập nhật</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
p,
h2 {
    margin: 0px;
    padding: 0px;
}

.head-title {
    text-align: center;
}

.wrapper {
    max-width: 768px;
}

.link{
    text-decoration: none;
    color: black;
}


.base-input {
    border: 1px solid #c6c6c6;
    border-radius: 8px;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
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

.avatar {
    height: 100%;
    .avatar-preview {
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
        border-radius: 100px;
        width: 150px;
        height: 150px;
        background-size: cover;

        .image-cancel-button {
            width: 25px;
            height: 25px;
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 1;
        }
    }
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
}
</style>