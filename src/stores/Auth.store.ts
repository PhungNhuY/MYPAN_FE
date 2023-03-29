import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";
import httpService from "@/services/http.service";
import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import authStorageService from "@/services/local-storage/authStorage.service";
import type { IUser } from "@/common/interfaces";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser>();
    const returnUrl = ref('/');
    // khi ko login => user.value = {}
    user.value = authStorageService.getLoginUser();

    async function login(email: string, password: string) {
        try {
            const response = await httpService.post('/auth/login', { email, password });
            const responseBody = response.data;
            const {data, status} = responseBody;
            const currentUser = data.user;

            // save user to local storage
            authStorageService.setLoginUser(currentUser as IUser);
            
            // update pinia state
            user.value = authStorageService.getLoginUser();
            
            router.push(returnUrl.value || '/');
            showSuccessNotificationFunction('Hi: ' + currentUser.email);
        } catch (error) {
            console.log(error);
            showErrorNotificationFunction('login fail: '+ error.response.data.message[0]);
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