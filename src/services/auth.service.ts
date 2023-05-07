import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import httpService, { callApi } from "./http/http.service";
import router from "@/router";
import authStorageService from '@/services/local-storage/authStorage.service';

export async function checkConfirm(token: string): Promise<boolean>{
    const response = await callApi(httpService.get(`/auth/confirm?token=${token}`));
    if(response?.status == 'success'){
        const accesstoken = response.data.accesstoken;
        authStorageService.setAccessToken(accesstoken);
        return true;
    }else {
        return false;
    }
}

export async function sendForgotPassEmail(email: string): Promise<boolean>{
    const response = await callApi(httpService.get(`/auth/forgot/${email}`));
    if(response?.status == 'success'){
        showSuccessNotificationFunction('Gửi yêu cầu thành công. Hãy kiểm tra email của bạn.')
        return true;
    }else if (response?.status == 'error') {
        showErrorNotificationFunction('Có lỗi xảy ra, vui lòng thử lại sau');
        return false;
    }
    return false;
}

export async function updatePassword(password: string){
    const response = await callApi(httpService.patch(`/user`, {password}));
    if(response?.status == 'success'){
        showSuccessNotificationFunction('Cập nhật mật khẩu thành công');
        authStorageService.resetAll();
        router.push('/auth/login');
    }else if (response?.status == 'error') {
        authStorageService.resetAll();
        showErrorNotificationFunction('Cập nhật mật khẩu không thành công');
    }
}