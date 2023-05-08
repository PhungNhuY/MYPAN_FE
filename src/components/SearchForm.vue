<script setup lang="ts">
import { ref } from 'vue';
const searchData = ref('');

function searchAction() {
    console.log(searchData.value);
}
</script>

<template>
    <form class="search-form" @submit.prevent="searchAction">
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