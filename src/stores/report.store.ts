import { showErrorNotificationFunction, showSuccessNotificationFunction } from "@/common/helper";
import type { IReport } from "@/common/interfaces";
import httpService, { callApi } from "@/services/http/http.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useReportStore = defineStore('report', () => {
    const reports = ref<IReport[]>([])
    const numOfPage = ref(1);
    const currentPage = ref(1);
    const isLoading = ref(false);

    async function getReports(page=1, perPage = 5){
        const response = await callApi(httpService.get(`/report?page=${page}&perPage=${perPage}`));
        isLoading.value = false;
        if(response?.status == 'success'){
            reports.value = reports.value.concat(response?.data.reports);
            numOfPage.value = Math.ceil(response?.data.total/perPage);
        }
    }

    async function createReport(postId: string){
        const response = await callApi(httpService.post(`/report/${postId}`));
        if(response?.status == 'success'){
            showSuccessNotificationFunction('Báo cáo món ăn thành công');
        }else{
            showErrorNotificationFunction(response?.message[0]);
        }
    }

    async function violate(reportId: string){
        const response = await callApi(httpService.get(`/report/violate/${reportId}`));
        if(response?.status == 'success'){
            showSuccessNotificationFunction('Đã xác nhận vi phạm');
            // remove report
            reports.value = reports.value.filter(report => {
                return report._id != reportId;
            })
        }else{
            showErrorNotificationFunction(response?.message[0]);
            console.log(response);
        }
    }

    async function noViolate(reportId: string){

        const response = await callApi(httpService.get(`/report/noViolate/${reportId}`));
        if(response?.status == 'success'){
            showSuccessNotificationFunction('Đã xác nhận không vi phạm');
            // remove report
            reports.value = reports.value.filter(report => {
                return report._id != reportId;
            })
        }else{
            showErrorNotificationFunction(response?.message[0]);
            console.log(response);
        }
    }

    return {
        reports,
        numOfPage,
        currentPage,
        isLoading,
        getReports,
        createReport,
        violate,
        noViolate
    }
});