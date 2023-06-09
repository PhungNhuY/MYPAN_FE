import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import type { ICreatePost, IPost, ISave } from "@/common/interfaces";
import router from "@/router";
import httpService, { callApi } from "@/services/http/http.service";
import authStorageService from "@/services/local-storage/authStorage.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore('post', () => {
    const post = ref<IPost>();
    const listOfPost = ref<IPost[]>([]);
    const numOfPage = ref(1);
    const currentPage = ref(1);
    const isLoading = ref(false);

    const numOfLike = ref(0);
    const isLike = ref(false);
    const isSaved = ref(false);


    const listOfSave = ref<ISave[]>([]);
    const numOfPageSave = ref(1);
    const currentPageSave = ref(1);
    const isLoadingSave = ref(false);

    async function getPost(id: string){
        const response = await callApi(httpService.get(`/post/${id}`));
        // console.log(response);
        if(response?.status == 'success'){
            post.value = response?.data.post;
            return post.value;
        } else if (response?.status == 'error') {
            if(response?.message == 'Not Found' || response?.message == 'Bad Request'){
                showErrorNotificationFunction('Không tìm thấy món ăn bạn yêu cầu!');
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
        if(response?.status == 'success'){
            router.push(`/post/${response?.data.post._id}`)
        } else if (response?.status == 'error') {
            // showErrorNotificationFunction('Có lỗi xảy ra, vui lòng thử lại sau!');
            showErrorNotificationFunction(response?.message[0]);
        }
    }

    async function updatePost(id: string, data: ICreatePost) {
        // console.log(data);
        const response = await callApi(httpService.patch(
            `/post/${id}`,
            {...data},
        ));
        console.log(response);
        if(response?.status == 'success'){
            showSuccessNotificationFunction('Cập nhật thành công');
            router.push(`/post/${response?.data.post._id}`)
        } else if (response?.status == 'error') {
            // showErrorNotificationFunction('Có lỗi xảy ra, vui lòng thử lại sau!');
            showErrorNotificationFunction(response?.message[0]);
        }
    }

    async function getListOfPost(id?: string, page = 1, perPage = 5){
        let response;
        if(!id){
            response = await callApi(httpService.get(`/post/list?page=${page}&perPage=${perPage}`));
        }else{
            response = await callApi(httpService.get(`/post/list/${id}?page=${page}&perPage=${perPage}`));
        }
        isLoading.value = false;
        if(response?.status == 'success'){
            listOfPost.value = listOfPost.value.concat(response?.data.posts);
            // console.log(listOfPost.value);
            numOfPage.value = Math.ceil(response?.data.total/perPage);
        } 
        // else if (response?.status == 'error') {}
    }

    async function deletePost(id: string) {
        const response = await callApi(httpService.delete(`/post/${id}`));
        if(response?.status == 'success'){
            showSuccessNotificationFunction('Xóa món ăn thành công');
            router.push('/profile');
        } else if (response?.status == 'error') {
            showErrorNotificationFunction('Có lỗi xảy ra, vui lòng thử lại sau!');
            // showErrorNotificationFunction(response?.message[0]);
        }
    }

    async function getNumOfLike(postId: string){
        const response = await callApi(httpService.get(`/like/count/${postId}`));
        if(response?.status == 'success'){
            numOfLike.value = response.data.numOfLike;
        }
    }

    async function like(postId: string){
        const response = await callApi(httpService.post(`/like/${postId}`));
        if(response?.status == 'success'){
            numOfLike.value++;
            isLike.value = true;
        }
    }

    async function unlike(postId: string){
        const response = await callApi(httpService.post(`/like/unlike/${postId}`));
        if(response?.status == 'success'){
            numOfLike.value--;
            isLike.value = false;
        }
    }

    async function checkIsLike(postId: string){
        const response = await callApi(httpService.get(`/like/isliked/${postId}`));
        if(response?.status == 'success'){
            isLike.value = response.data.isLiked;
        }
    }

    async function checkIsSaved(postId: string){
        const response = await callApi(httpService.get(`/save/issaved/${postId}`));
        if(response?.status == 'success'){
            isSaved.value = response.data.isSaved;
        }
    }

    async function save(postId: string){
        const response = await callApi(httpService.post(`/save/${postId}`));
        if(response?.status == 'success'){
            isSaved.value = true;
        }
    }

    async function unsave(postId: string){
        const response = await callApi(httpService.post(`/save/unsave/${postId}`));
        if(response?.status == 'success'){
            isSaved.value = false;
        }
    }

    async function getListOfSave(page = 1, perPage = 5){
        const response = await callApi(httpService.get(`/save?page=${page}&perPage=${perPage}`));
        isLoadingSave.value = false;
        if(response?.status == 'success'){
            listOfSave.value = listOfSave.value.concat(response?.data.savePosts);
            // console.log(listOfSave.value);
            numOfPageSave.value = Math.ceil(response?.data.total/perPage);
        }
        // else if (response?.status == 'error') {}
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
        currentPage,
        isLoading,
        numOfLike,
        isLike,
        getNumOfLike,
        like,
        unlike,
        checkIsLike,
        isSaved,
        checkIsSaved,
        save,
        unsave,
        getListOfSave,
        listOfSave,
        numOfPageSave,
        currentPageSave,
        isLoadingSave,
    };
})