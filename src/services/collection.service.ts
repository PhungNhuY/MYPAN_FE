import type { ICollection, ICreateCollection } from "@/common/interfaces";
import httpService, { callApi } from "./http/http.service";
import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import router from "@/router";

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
    const response = await callApi(httpService.delete(`/collection/${id}`));
    if(response?.status == 'success'){
        showSuccessNotificationFunction('Xóa bộ sưu tập thành công');
        return true;
    }else {
        showErrorNotificationFunction('Có lỗi xaỷ ra, vui lòng thử lại sau');
        return null;
    }
}

export async function createCollection(data:ICreateCollection){
    const response = await callApi(httpService.post(`/collection`, {...data}));
    console.log(response);
    if(response?.status == 'success'){
        showSuccessNotificationFunction('Tạo bộ sưu tập thành công');
        return true;
    }else {
        showErrorNotificationFunction('Có lỗi xaỷ ra, vui lòng thử lại sau');
        return null;
    }
}

export async function UpdateCollection(id: string, data:ICreateCollection){
    const response = await callApi(httpService.patch(`/collection/${id}`, {...data}));
    if(response?.status == 'success'){
        showSuccessNotificationFunction('Cập nhật thành công');
        return true;
    }else {
        showErrorNotificationFunction('Có lỗi xaỷ ra, vui lòng thử lại sau');
        return null;
    }
}

export async function getCollectionById(id: string){
    const response = await callApi(httpService.get(`/collection/${id}`));
    console.log(response);
    if(response?.status == 'success'){
        const collection = response.data.collection;
        return collection;
    }else {
        showErrorNotificationFunction('Có lỗi xaỷ ra, vui lòng thử lại sau');
        router.push('/admin/collection');
        return null;
    }
}