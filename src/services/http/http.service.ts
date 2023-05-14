import { showErrorNotificationFunction } from '@/common/helper';
import router from '@/router';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import authStorageService from '../local-storage/authStorage.service';
import { useAuthStore } from '@/stores/Auth.store';

const httpService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
httpService.interceptors.request.use(function (config) {
    config.headers.accesstoken =  authStorageService.getAccessToken();
    return config;
});
export default httpService;

export interface httpResponse{
    status: 'success' | 'error' | 'netError';
    data?: any | object;
    error?: any | string;
    message?: any | string[];
}

export async function callApi(callback: Promise<AxiosResponse<any, any>>){
    let response:httpResponse | null = null;
    try {
        const theResponse = await callback;
        response = buildSuccessResponse(theResponse.data.data);
    } catch (error) {
        const err = error as AxiosError
        console.log(error);
        if(err.code == 'ERR_NETWORK'){
            response = buildNetErrorResponse();
            showErrorNotificationFunction('Lỗi kết nối, vui lòng thử lại sau!');
        }else if(err.response?.status == 401){
            // try to refresh token
            try {
                const authResponse = await httpService.get('/auth/refresh', 
                    {
                        headers:{
                            refreshtoken: authStorageService.getRefreshToken(),
                        }
                    }
                );
                await authStorageService.setAccessToken(authResponse.data.data.accesstoken);
            } catch (error) {
                // if error -> logout
                // useAuthStore().logout();
                const authStore = useAuthStore();
                authStore.logout();
            }
        }else if(err.response?.status == 403){
            // useAuthStore().logout();
            const authStore = useAuthStore();
            authStore.logout();
        }else{
            response = buildErrorResponse(err.response?.data)
        }
    }
    return response;
}

function buildSuccessResponse(data:any):httpResponse{
    return {
        status: "success",
        data: data
    }
}

function buildErrorResponse(data:any):httpResponse{
    return {
        status: "error",
        error: data.error,
        message: data.message
    }
}

function buildNetErrorResponse():httpResponse{
    return {
        status: "netError",
    }
}