import httpService, { callApi } from "./http/http.service";

export async function checkConfirm(token: string): Promise<boolean>{
    const response = await callApi(httpService.get(`/auth/confirm?token=${token}`));
    if(response?.status == 'success'){
        return true;
    }else if (response?.status == 'error') {
        return false;
    }
    return false;
}