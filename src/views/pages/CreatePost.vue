<script setup lang="ts">
import type { ICreatePost, IIngre, IStep } from '@/common/interfaces';
import MyCard from '@/components/MyCard.vue';
import { computed, ref } from 'vue';
import { uploadImage } from '@/services/image.service';
import { usePostStore } from '@/stores/post.store';

const postStore = usePostStore();

const imageCoverLink = ref<String | null>(null);
const name = ref<String>('');
const des = ref<String>('');
const ration = ref<Number | null>(null);
const time = ref<Number | null>(null);
const ingres = ref<IIngre[]>([{ name: '' }]);
const steps = ref<IStep[]>([{
    content: '',
    imageLink: [null, null, null],
}]);


function addIngre(pos: number) {
    ingres.value.splice(pos + 1, 0, { name: '' });
}
function removeIngre(pos: number) {
    if (ingres.value.length > 1) {
        ingres.value.splice(pos, 1);
    }
}
function addStep(pos: number) {
    steps.value.splice(pos + 1, 0, {
        content: '',
        imageLink: [null, null, null],
    });
}
function removeStep(pos: number) {
    if (steps.value.length > 1) {
        steps.value.splice(pos, 1);
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

// handle upload image in step
//escapse template unwrapping
const skipUnwrap = { inputImageStep: ref([]) };
// for convenience
let el = computed(() => skipUnwrap.inputImageStep.value);

async function pickImageStep(stepIndex: number, imageIndex: number) {
    if (skipUnwrap.inputImageStep.value[stepIndex * 3 + imageIndex]) {
        let file = skipUnwrap.inputImageStep.value[stepIndex * 3 + imageIndex].files;
        if (file && file[0]) {
            if (steps.value[stepIndex].imageLink[0] == null) {
                const imageLink = await uploadImage(file[0]);
                steps.value[stepIndex].imageLink[0] = imageLink;
            } else if (steps.value[stepIndex].imageLink[1] == null) {
                const imageLink = await uploadImage(file[0]);
                steps.value[stepIndex].imageLink[1] = imageLink;
            } else if (steps.value[stepIndex].imageLink[2] == null) {
                const imageLink = await uploadImage(file[0]);
                steps.value[stepIndex].imageLink[2] = imageLink;
            }
        }
    }
}
function selectImageStep(stepIndex: number, imageIndex: number) {
    if (skipUnwrap.inputImageStep.value[stepIndex * 3 + imageIndex]) {
        skipUnwrap.inputImageStep.value[stepIndex * 3 + imageIndex].click();
    }
}
function removeCurrentImage(stepIndex: number, imageIndex: number) {
    steps.value[stepIndex].imageLink[imageIndex] = null;

    // sort image list
    if(!steps.value[stepIndex].imageLink[0] && steps.value[stepIndex].imageLink[1]){
        steps.value[stepIndex].imageLink[0] = steps.value[stepIndex].imageLink[1];
        steps.value[stepIndex].imageLink[1] = null;
    }
    if(!steps.value[stepIndex].imageLink[1] && steps.value[stepIndex].imageLink[2]){
        steps.value[stepIndex].imageLink[1] = steps.value[stepIndex].imageLink[2];
        steps.value[stepIndex].imageLink[2] = null;
    }
}

function create() {
    const data: ICreatePost = {
        name: name.value as string,
        description: des.value,
        imageCoverLink: imageCoverLink.value,
        ration: ration.value,
        time: time.value,
        ingredients: ingres.value as Array<IIngre>,
        steps: steps.value as Array<IStep>
    };

    // clean data
    if (!data.description) delete data.description;
    if (!data.imageCoverLink) delete data.imageCoverLink;
    if (!data.ration) delete data.ration;
    if (!data.time) delete data.time;
    data.ingredients.forEach(i => {
        if (!i.quantity) delete i.quantity;
    });
    data.steps.forEach(i => {
        if (i.imageLink) {
            while (i.imageLink.length > 0 && !i.imageLink[0]) {
                i.imageLink.shift();
            }
            while (i.imageLink.length > 0 && !i.imageLink[i.imageLink.length - 1]) {
                i.imageLink.pop();
            }
        }
    });
    postStore.createPost(data);
    // console.log(data);
}
</script>

<template>
    <div class="container wrapper">
        <h2 class="head-title">Tạo bài viết mới</h2>
        <MyCard class="base-info">
            <div class="image-cover d-flex justify-content-center my-5">
                <div class="d-flex flex-column justify-content-center align-items-center"
                    :style="{ 'background-image': `url(${imageCoverLink})` }"
                    :class="imageCoverLink == null ? 'image-cover-preview' : 'has-image'" @click="selectImage">
                    <img v-if="imageCoverLink == null" src="@/assets/icons/add-gray.png" alt="" srcset="" class="icon">
                    <p v-if="imageCoverLink == null" class="title">Hãy tải lên một hình ảnh minh họa cho món ăn nhé!</p>
                    <img v-else src="@/assets/icons/cancel-red.png" alt="" srcset="" class="image-cancel-button"
                        @click.stop="removeCurrentImageCover">
                </div>
                <input class="d-none" ref="inputImage" type="file" @input="pickImageCover">
            </div>
            <div class="row">
                <div class="col-6">
                    <p class="name">Tên món ăn</p>
                    <input class="base-input" type="text" placeholder="Nhập tên món ăn" v-model="name">
                    <div class="row">
                        <div class="col-6">
                            <p class="ration pt-2">Khẩu phần ăn (người)</p>
                            <input class="base-input" type="number" placeholder="2 Người" min="1" v-model="ration">
                        </div>
                        <div class="col-6">
                            <p class="time pt-2">Thời gian nấu (phút)</p>
                            <input class="base-input" type="number" placeholder="30 phút" min="1" v-model="time">
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <p class="description">Mô tả</p>
                    <textarea class="base-textarea description-content" rows="3" v-model="des"></textarea>
                </div>
            </div>
        </MyCard>
        <MyCard class="ingre">
            <p class="title">Nguyên liệu</p>
            <div class="row">
                <div class="col-6">Tên nguyên liệu</div>
                <div class="col-6">Định lượng</div>
            </div>
            <div v-for="(ingre, index) in ingres" :key="index" class="row mb-2">
                <div class="col-6">
                    <input class="base-input" type="text" placeholder="Thịt bò" v-model="ingre.name">
                </div>
                <div class="col-5">
                    <input class="base-input" type="text" placeholder="200 gram" v-model="ingre.quantity">
                </div>
                <div class="col-1 d-flex justify-content-around">
                    <button class="base-button add-button" @click="addIngre(index)">
                        <img src="@/assets/icons/add-green.png" alt="" srcset="" class="icon">
                    </button>
                    <button v-if="ingres.length > 1" class="base-button remove-button" @click="removeIngre(index)">
                        <img src="@/assets/icons/cancel-red.png" alt="" srcset="" class="icon">
                    </button>
                </div>
            </div>
        </MyCard>
        <MyCard class="steps">
            <p class="title">Các bước nấu</p>
            <div v-for="(step, stepIndex) in steps" :key="stepIndex" class="single-step">
                <div class="d-flex">
                    <div class="left">
                        <p class="order">{{ stepIndex + 1 }}</p>
                    </div>
                    <div class="right row">
                        <div class="col-7">
                            <textarea class="base-textarea" rows="4" v-model="step.content"></textarea>
                        </div>
                        <div class="col-5 d-flex">
                            <div v-for="(i, imageStepIndex) in 3" :key="imageStepIndex"
                                class="image-step d-flex justify-content-center me-1">
                                <div class="d-flex flex-column justify-content-center align-items-center"
                                    :style="{ 'background-image': `url(${step.imageLink[imageStepIndex]})` }"
                                    :class="(step.imageLink[imageStepIndex] == null) ? 'image-preview' : 'has-image'"
                                    @click="selectImageStep(stepIndex, imageStepIndex)">
                                    <img v-if="step.imageLink[imageStepIndex] == null" src="@/assets/icons/add-gray.png"
                                        alt="" srcset="" class="icon">
                                    <p v-if="step.imageLink[imageStepIndex] == null" class="title">Ảnh minh họa</p>
                                    <img v-else src="@/assets/icons/cancel-red.png" alt="" srcset=""
                                        class="image-cancel-button"
                                        @click.stop="removeCurrentImage(stepIndex, imageStepIndex)">
                                </div>
                                <input :id="`${stepIndex}-${imageStepIndex}`" type="file" class="d-none"
                                    :ref="skipUnwrap.inputImageStep" @input="pickImageStep(stepIndex, imageStepIndex)">
                            </div>
                        </div>
                    </div>
                    <div class="add-remove d-flex align-items-center">
                        <div class="d-flex justify-content-around align-items-center">
                            <button class="base-button add-button" @click="addStep(stepIndex)">
                                <img src="@/assets/icons/add-green.png" alt="" srcset="" class="icon">
                            </button>
                            <button v-if="steps.length > 1" class="base-button remove-button"
                                @click="removeStep(stepIndex)">
                                <img src="@/assets/icons/cancel-red.png" alt="" srcset="" class="icon">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MyCard>
        <div class="buttons d-flex justify-content-center">
            <button class="base-button cancel-button">Hủy</button>
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