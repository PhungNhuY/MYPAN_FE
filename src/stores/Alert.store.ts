import {defineStore} from 'pinia';
import { ref } from 'vue';
export const useAlertStore = defineStore('alert', () => {
    const alert = ref<any>();
    alert.value = null;
    function success(message: any){
        alert.value = {message, type: 'alert-success'};
    }
    function error(message: any){
        alert.value = {message, type: 'alert-danger'};
    }
    function clear(){
        alert.value = null;
    }

    return {
        alert,
        success,
        error,
        clear
    }
});