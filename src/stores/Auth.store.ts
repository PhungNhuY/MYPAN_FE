import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlertStore } from "./Alert.store";
import router from "@/router";
import httpService from "@/services/http.service";
import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import authStorageService from "@/services/local-storage/authStorage.service";
import type { IUser } from "@/common/interfaces";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser | null>();
    const returnUrl = ref<string | null>();
    // user.value = JSON.parse(localStorage.getItem('user'));
    // user.value = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') as string) : null;
    user.value = authStorageService.getLoginUser();
    returnUrl.value = null;

    async function login(email: string, password: string) {
        try {
            const response = await httpService.post('/auth/login', { email, password });
            const responseData = response.data;
            const {data, status} = responseData;
            const currentUser = data.user;
            console.log(currentUser);
            
            // update pinia state
            user.value = currentUser;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(currentUser));
            authStorageService.setLoginUser(currentUser.value as IUser);

            router.push(returnUrl.value || '/');
            showSuccessNotificationFunction('Hi: ' + currentUser.email);
        } catch (error) {
            console.log(error);
            // const alertStore = useAlertStore();
            // alertStore.error('login fail: '+ error.response.data.message[0]);
            showErrorNotificationFunction('login fail: '+ error.response.data.message[0]);
        }
    }

    async function register(email: string, password: string){

    }

    function logout() {
        user.value = null;
        localStorage.removeItem('user');
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