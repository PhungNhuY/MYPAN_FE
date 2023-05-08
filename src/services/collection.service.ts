import type { ICollection } from "@/common/interfaces";
import httpService, { callApi } from "./http/http.service";
import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";

export async function getAllCollection(){
    const response = await callApi(httpService.get(`/collection`));
    if(response?.status == 'success'){
        const collections = response.data.collections;
        return collections as ICollection[];
    }else if (response?.status == 'error') {
        // showErrorNotificationFunction('Có lỗi xaỷ ra, vui lòng thử lại sau');
        return null;
    }
    return null;
}

export async function deleteCollection(id: string){
    console.log(id);
    
    const response = await callApi(httpService.delete(`/collection/${id}`));
    if(response?.status == 'success'){
        showSuccessNotificationFunction('Xóa bộ sưu tập thành công');
        return true;
    }else {
        showErrorNotificationFunction('Có lỗi xaỷ ra, vui lòng thử lại sau');
        return null;
    }
}