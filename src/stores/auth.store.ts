import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlertStore } from "./Alert.store";
import router from "@/router";

export const useAuthStore = defineStore('auth', ()=> {
    const user = ref<object | null>();
    const returnUrl = ref<string | null>();
    user.value = null;
    returnUrl.value = null;

    function login(username: string, password: string){
        try {
            if(username == 'admin' && password == 'admin'){
                user.value = {
                    username,
                    accesstoken: 'accesstoken-phungnhuy'
                };

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                router.push(returnUrl.value || '/');
            }else{
                throw new Error('Username or password is incorrect')
            }
        } catch (error) {
            const alertStore = useAlertStore();
            alertStore.error(error);
        }
    }

    function logout() {
        user.value = null;
        localStorage.removeItem('user');
        router.push('/account/login');
    }

    return{
        user,
        returnUrl,
        login,
        logout
    }
});