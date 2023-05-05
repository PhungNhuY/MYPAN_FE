import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import type { ICreatePost, IPost } from "@/common/interfaces";
import router from "@/router";
import httpService, { callApi } from "@/services/http/http.service";
import authStorageService from "@/services/local-storage/authStorage.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore('post', () => {
    const post = ref<IPost>();

    async function getPost(id: string){
        const response = await callApi(httpService.get(`/post/${id}`));
        // console.log(response);
        if(response.status == 'success'){
            post.value = response.data.post;
            return post.value;
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

    async function createPost(data: ICreatePost) {
        // console.log(data);
        const response = await callApi(httpService.post(
            `/post`,
            {...data},
            {
                headers:{
                    accesstoken: authStorageService.getAccessToken(),
                }
            }
        ));
        console.log(response);
        if(response.status == 'success'){
            router.push(`/post/${response.data.post._id}`)
        } else if (response.status == 'error') {
            // showErrorNotificationFunction('Có lỗi xảy ra, vui lòng thử lại sau!');
            showErrorNotificationFunction(response.message[0]);
        }
    }

    async function updatePost(id: string, data: ICreatePost) {
        // console.log(data);
        const response = await callApi(httpService.patch(
            `/post/${id}`,
            {...data},
            {
                headers:{
                    accesstoken: authStorageService.getAccessToken(),
                }
            }
        ));
        console.log(response);
        if(response.status == 'success'){
            showSuccessNotificationFunction('Cập nhật thành công');
            router.push(`/post/${response.data.post._id}`)
        } else if (response.status == 'error') {
            // showErrorNotificationFunction('Có lỗi xảy ra, vui lòng thử lại sau!');
            showErrorNotificationFunction(response.message[0]);
        }
    }

    return {
        post,
        getPost,
        createPost,
        updatePost,
    };
})