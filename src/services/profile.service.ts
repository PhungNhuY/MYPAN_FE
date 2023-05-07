import { showErrorNotificationFunction } from "@/common/helper";
import httpService, { callApi } from "./http/http.service";
import router from "@/router";
import type { IUser } from "@/common/interfaces";

export async function getProfile(username: string): Promise<IUser | null>{
    const response = await callApi(httpService.get(`/user/username/${username}`))
    if(response?.status == 'success'){
        const profile = response.data.user;
        return profile as IUser;
    }else if (response?.status == 'error') {
        console.log(response);
        showErrorNotificationFunction('Có lỗi xaỷ ra, vui lòng thử lại sau');
        router.push('/');
        return null;
    }
    return null;
}