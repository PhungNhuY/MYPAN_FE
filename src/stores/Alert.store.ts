import {defineStore} from 'pinia';
import { ref } from 'vue';
export const useAlertStore = defineStore('alert', () => {
    const alert = ref<any>();
    alert.value = null;
    function success(message: any){
        alert.value = {message, type: 'alert-success'};
        setTimeout(clear, 5000);
    }
    function error(message: any){
        alert.value = {message, type: 'alert-danger'};
        setTimeout(clear, 5000);
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