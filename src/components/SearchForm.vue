<script setup lang="ts">
import { removeVietnameseTones } from '@/common/language-handle';
import { onMounted, ref } from 'vue';
import MyCard from './MyCard.vue';
import { onClickOutside } from '@vueuse/core';
import PostProfile from './PostProfile.vue';
import { storeToRefs } from 'pinia';
import {useSearchStore} from '@/stores/search.store';
import router from '@/router';

const searchData = ref('');

const isShow = ref(false);
const searchForm = ref(null);
onClickOutside(searchForm, () => isShow.value = false);

function search(){
    if(searchData.value.trim().length > 0){
        // router.push(`/post/search/${searchData.value}`);
        window.location = `/post/search/${searchData.value.trim()}`;
    }
}
</script>

<template>
    <form class="search-form" @click="isShow=true" @submit.prevent="search" ref="searchForm">
        <input type="text" class="search-form-input" name="search" placeholder="Tìm món ăn"
            v-model="searchData">
        <button type="submit" class="search-form-submit">
            <img src="@/assets/icons/search-interface-symbol.png" alt="" srcset="">
        </button>
    </form>
</template>

<style lang="scss" scoped>
.search-form {
    width: 100%;
    padding: 0px 8px;
    position: relative;
    
    .search-form-input {
        width: 100%;
        height: 36px;
        border-radius: 99px;
        border: 1px solid #DCDCDC;
        padding: 0px 12px;
        padding-right: 50px;
        background-color: #ffffff;

        &:focus {
            outline: none;
        }
    }

    .search-form-submit {
        position: absolute;
        height: 36px;
        width: 50px;
        top: 0px;
        right: 0px;
        background-color: #ffaa55;
        border-radius: 0px 99px 99px 0px;
    }

    .search-form-submit img {
        width: 20px;
        height: 20px;
    }
}
</style>