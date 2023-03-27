import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlertStore } from "./Alert.store";
import router from "@/router";
import httpService from "@/services/http.service";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<object | null>();
    const returnUrl = ref<string | null>();
    // user.value = JSON.parse(localStorage.getItem('user'));
    user.value = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') as string) : null;
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
            localStorage.setItem('user', JSON.stringify(currentUser));

            router.push(returnUrl.value || '/');
        } catch (error) {
            const alertStore = useAlertStore();
            alertStore.error(error);
        }
    }

    function logout() {
        user.value = null;
        localStorage.removeItem('user');
        router.push('/');
    }

    return {
        user,
        returnUrl,
        login,
        logout
    }
});