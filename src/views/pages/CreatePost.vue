<script setup lang="ts">
import type { IIngre } from '@/common/interfaces';
import MyCard from '@/components/MyCard.vue';
import { ref } from 'vue';

const ingres = ref<IIngre[]>([{name: '', quantity: ''}]);

function addIngre(pos: number){
    ingres.value.splice(pos+1, 0, {name: '', quantity: ''});
}
function removeIngre(pos: number){
    if(ingres.value.length >1){
        ingres.value.splice(pos, 1);
    }
}
</script>

<template>
    <div class="container wrapper">
        <h2 class="head-title">Tạo bài viết mới</h2>
        <MyCard class="base-info">
            <div class="row">
                <div class="col-6">
                    <p class="name">Tên món ăn</p>
                    <input class="base-input" type="text" placeholder="Nhập tên món ăn">
                    <div class="row">
                        <div class="col-6">
                            <p class="ration pt-2">Khẩu phần ăn (người)</p>
                            <input class="base-input" type="number" placeholder="2 Người" min="1">
                        </div>
                        <div class="col-6">
                            <p class="time pt-2">Thời gian nấu (phút)</p>
                            <input class="base-input" type="number" placeholder="30 phút" min="1">
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <p class="description">Mô tả</p>
                    <textarea class="base-textarea description-content" rows="3"></textarea>
                </div>
            </div>
        </MyCard>
        <MyCard class="ingre">
            <p class="title">Nguyên liệu</p>
            <div class="row">
                <div class="col-6">Tên nguyên liệu</div>
                <div class="col-6">Định lượng</div>
            </div>
            <div
                v-for="(ingre, index) in ingres"
                :key="index"
                class="row mb-2"
            >
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
        </MyCard>
        <div class="buttons d-flex justify-content-center">
            <button class="base-button cancel-button">Hủy</button>
            <button class="base-button create-button">Đăng</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
p,
h2 {
    margin: 0px;
    padding: 0px;
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
.base-button{
    height: 40px;
    border-radius: 12px;
    background-color: white;
    border: 1px solid #c6c6c6;
    &:hover{
        scale: 1.05;
    }
}

.base-textarea {
    border: 1px solid #c6c6c6;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
}

.base-info{
    .description-content{
        height: 111px;
    }
}

.ingre{
    &>.title{
        font-size: 20px;
        font-weight: 500;
    }
    .add-button{
        border: unset;
        .icon{
            width: 25px;
            height: 25px;
        }
    }
    .remove-button{
        border: unset;
        .icon{
            width: 21px;
            height: 21px;
        }
    }
}
.steps{
    &>.title{
        font-size: 20px;
        font-weight: 500;
    }
}
.buttons{
    margin-top: 10px;
    font-weight: 500;
    font-size: 20px;
    .create-button{
        width: 100px;
        margin-left: 10px;
        background-color: #ffaa55;
        border: 1px solid #ffaa55;
    }
    .cancel-button{
        width: 100px;
        border: 1px solid #ffaa55;
    }
}
</style>