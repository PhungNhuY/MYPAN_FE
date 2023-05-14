import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";
import httpService, { callApi } from "@/services/http/http.service";
import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import authStorageService from "@/services/local-storage/authStorage.service";
import type { IUser } from "@/common/interfaces";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser>();
    const returnUrl = ref<string>('/');
    // khi ko login => user.value = {}
    user.value = authStorageService.getLoginUser();

    async function login(email: string, password: string) {
        const response = await callApi(httpService.post('/auth/login', { email, password }));
        if (response?.status == 'success') {
            const currentUser = response?.data?.user;
            // save user to local storage
            authStorageService.setLoginUser(currentUser as IUser);

            // save token
            authStorageService.setAccessToken(response?.data?.accesstoken);
            authStorageService.setRefreshToken(response?.data?.refreshtoken);

            // update pinia state
            user.value = authStorageService.getLoginUser();

            router.push(returnUrl.value || '/');
            showSuccessNotificationFunction('Xin chào: ' + currentUser.fullname);
            // reset return url
            returnUrl.value = '/';
        } else if (response?.status == 'error') {
            showErrorNotificationFunction('Đăng nhập thất bại: ' + response?.message[0]);
        }
    }

    async function register(email: string, fullname: string, username: string, password: string){
        const response = await callApi(httpService.post('/auth/register', { email, fullname, username, password }));
        if (response?.status == 'success') {
            router.push('/auth/login');
            showSuccessNotificationFunction('Đăng ký thành công! Hãy xác nhận email của bạn.');
        } else if (response?.status == 'error') {
            showErrorNotificationFunction('Đăng ký thất bại: ' + response?.message[0]);
        }
    }

    async function updateInfo(data: IUser){
        const response = await callApi(httpService.patch(`/user`, {...data}));
        if(response?.status == 'success'){
            const currentUser = response?.data?.user;

            // save user to local storage
            authStorageService.setLoginUser(currentUser as IUser);

            // update pinia state
            user.value = authStorageService.getLoginUser();
            router.push('/profile');
            showSuccessNotificationFunction('Cập nhật thành công');
        }else{
            showErrorNotificationFunction(response?.message[0]);
        }
    }

    function logout() {
        // user.value = undefined;
        authStorageService.resetAll();
        user.value = authStorageService.getLoginUser();
        router.push('/auth/login');
    }

    return {
        user,
        returnUrl,
        login,
        register,
        logout,
        updateInfo
    }
});