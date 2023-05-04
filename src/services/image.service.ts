import { showErrorNotificationFunction } from "@/common/helper";
import httpService, { callApi } from "./http/http.service";

export async function uploadImage(image: File): Promise<string|null>{
    const formData = new FormData();
    formData.append('image', image);
    const response = await callApi(httpService.post('/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }));
    if (response.status == 'success') {
        const imageLink = response.data?.imageLink;
        return imageLink;
    } else if (response.status == 'error') {
        showErrorNotificationFunction('Có lỗĩ khi tải ảnh lên. Vui lòng thử lại sau.');
        return null;
    }
    return null;
}