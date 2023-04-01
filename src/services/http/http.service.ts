import { showErrorNotificationFunction } from '@/common/helper';
import axios, { AxiosError, type AxiosResponse } from 'axios';

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export interface httpResponse{
    status: 'success' | 'error' | 'netError';
    data?: object;
    error?: string;
    message?: string[];
}

export async function callApi(callback: Promise<AxiosResponse<any, any>>){
    let response:httpResponse;
    try {
        const theResponse = await callback;
        response = buildSuccessResponse(theResponse.data.data);
    } catch (error) {
        const err = error as AxiosError
        if(err.code == 'ERR_NETWORK'){
            response = buildNetErrorResponse();
            showErrorNotificationFunction('Network error, try again!');
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