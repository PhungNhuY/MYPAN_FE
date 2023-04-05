import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";
import httpService, { callApi } from "@/services/http/http.service";
import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import authStorageService from "@/services/local-storage/authStorage.service";
import type { IUser } from "@/common/interfaces";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser>();
    const returnUrl = ref('/');
    // khi ko login => user.value = {}
    user.value = authStorageService.getLoginUser();

    async function login(email: string, password: string) {
        const response = await callApi(httpService.post('/auth/login', { email, password }));
        if (response.status == 'success') {
            const currentUser = response.data?.user;
            // save user to local storage
            authStorageService.setLoginUser(currentUser as IUser);

            // save token
            authStorageService.setAccessToken(response.data?.accesstoken);
            authStorageService.setRefreshToken(response.data?.refreshtoken);

            // update pinia state
            user.value = authStorageService.getLoginUser();

            router.push(returnUrl.value || '/');
            showSuccessNotificationFunction('Hi: ' + currentUser.email);
            // reset return url
            returnUrl.value = '/';
        } else if (response.status == 'error') {
            showErrorNotificationFunction('login fail: ' + response.message[0]);
        }
    }

    async function register(email: string, password: string){

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
        logout
    }
});