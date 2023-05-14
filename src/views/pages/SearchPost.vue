<script setup lang="ts">
import MyCard from '@/components/MyCard.vue';
import { useSearchStore } from '@/stores/search.store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostProfile from '@/components/PostProfile.vue';
import { removeVietnameseTones } from '@/common/language-handle';

// get textSearch from route
const route = useRoute();
const text = route.params.textsearch as string;
const textSearch = removeVietnameseTones(route.params.textsearch as string);

const searchStore = useSearchStore();
const {listOfPost, numOfPage, currentPage, isLoading} = storeToRefs(searchStore);
listOfPost.value = [];
currentPage.value = 1;
await searchStore.searchPost(textSearch);

function getNextPosts() {
    window.onscroll = async () => {
        window.onscroll = async () => {
            if ( (window.scrollY + window.innerHeight >= document.body.scrollHeight)  ) {
                // console.log('fired');
                if(currentPage.value<numOfPage.value){
                    currentPage.value++;
                    isLoading.value = true;
                    await searchStore.searchPost(textSearch, currentPage.value);
                }
            }
        }
    }
}
onMounted(() => {
    getNextPosts();
})
</script>

<template>
    <div class="container">
        <h2>Kết quả tìm kiếm cho '{{ text }}'</h2>
        <MyCard>
            <div v-if="listOfPost?.length == 0" class="w-100 d-flex justify-content-center">
                <img src="@/assets/images/not-found-512.png" alt="" class="w-25 opacity-25">
            </div>
            <PostProfile
                v-else
                v-for="post in listOfPost"
                :key="post._id"
                :data="post"
            />
        </MyCard>
    </div>
</template>

<style scoped lang="scss">
</style>