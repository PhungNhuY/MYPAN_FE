import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import type { ICreatePost, IPost } from "@/common/interfaces";
import router from "@/router";
import httpService, { callApi } from "@/services/http/http.service";
import authStorageService from "@/services/local-storage/authStorage.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore('post', () => {
    const post = ref<IPost>();
    const listOfPost = ref<IPost[]>();
    const numOfPage = ref(1);

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

    async function getListOfPost(id?: string, page = 1, perPage = 10){
        let response;
        if(!id){
            response = await callApi(httpService.get(`/post/list?page=${page}&perPage=${perPage}`));
        }else{
            response = await callApi(httpService.get(`/post/list/${id}?page=${page}&perPage=${perPage}`));
        }

        if(response.status == 'success'){
            listOfPost.value = response.data.posts;
            numOfPage.value = Math.ceil(response?.data.total/perPage);
        } else if (response.status == 'error') {
        }
    }

    async function deletePost(id: string) {
        const response = await callApi(httpService.delete(`/post/${id}`));
        if(response.status == 'success'){
            showSuccessNotificationFunction('Xóa bài viết thành công');
            router.push('/');
        } else if (response.status == 'error') {
            showErrorNotificationFunction('Có lỗi xảy ra, vui lòng thử lại sau!');
            // showErrorNotificationFunction(response.message[0]);
        }
    }

    return {
        post,
        getPost,
        createPost,
        updatePost,
        listOfPost,
        getListOfPost,
        numOfPage,
        deletePost,
    };
})