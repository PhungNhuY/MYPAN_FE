import { showErrorNotificationFunction } from '@/common/helper';
import router from '@/router';
import axios, { AxiosError, type AxiosResponse } from 'axios';

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export interface httpResponse{
    status: 'success' | 'error' | 'netError';
    data?: any | object;
    error?: any | string;
    message?: any | string[];
}

export async function callApi(callback: Promise<AxiosResponse<any, any>>){
    let response:httpResponse;
    try {
        const theResponse = await callback;
        response = buildSuccessResponse(theResponse.data.data);
    } catch (error) {
        const err = error as AxiosError
        console.log(error);
        if(err.code == 'ERR_NETWORK'){
            response = buildNetErrorResponse();
            showErrorNotificationFunction('Network error, try again!');
        }else if(err.response?.status == 401 || err.response?.status == 403){
            router.push('/auth/login');
            response = buildErrorResponse(err.response?.data)
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