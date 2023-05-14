import type { IPost } from "@/common/interfaces";
import httpService, { callApi } from "@/services/http/http.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore('search', () => {
    const listOfPost = ref<IPost[]>([]);
    const numOfPage = ref(1);
    const currentPage = ref(1);
    const isLoading = ref(false);

    async function searchPost(textSearch: string, page = 1, perPage = 5){
        const response = await callApi(httpService.get(`/post/search/${textSearch}`));
        isLoading.value = false;
        if(response?.status == 'success'){
            listOfPost.value = listOfPost.value.concat(response?.data.posts);
            numOfPage.value = Math.ceil(response?.data.total/perPage);
        } 
        // else if (response?.status == 'error') {}
    }

    return {
        listOfPost,
        numOfPage,
        currentPage,
        isLoading,
        searchPost
    }
});