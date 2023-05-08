import type { ICollection } from "@/common/interfaces";
import httpService, { callApi } from "@/services/http/http.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore('home', () => {
    const banner = ref<ICollection>();
    const collections = ref<ICollection[]>([]); 

    async function getBanner(){
        const response = await callApi(httpService.get(`/collection/banner`));
        if(response?.status == 'success'){
            banner.value = response.data.banner;
        }
        // else if(response?.status == 'error'){}
    }

    async function getAllActive() {
        const response = await callApi(httpService.get(`/collection/active`));
        if(response?.status == 'success'){
            collections.value = response.data.collections;
        }
    }

    return{
        getBanner,
        banner,
        getAllActive,
        collections,
    }
});