import { showErrorNotificationFunction } from "@/common/helper";
import type { IPost } from "@/common/interfaces";
import router from "@/router";
import httpService, { callApi } from "@/services/http/http.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore('post', () => {
    const post = ref<IPost>();

    async function getPost(id: string){
        const response = await callApi(httpService.get(`/post/${id}`));
        console.log(response);
        if(response.status == 'success'){
            post.value = response.data.post;
            // console.log(response.data.post);
        } else if (response.status == 'error') {
            if(response.message == 'Not Found' || response.message == 'Bad Request'){
                showErrorNotificationFunction('Không tìm thấy bài viết bạn yêu cầu!');
                router.push('/');
            }else{
                showErrorNotificationFunction('Có lỗi xảy ra, vui lòng thử lại sau!');
                router.push('/');
            }
        }
    }

    return {
        post,
        getPost,
    };
})