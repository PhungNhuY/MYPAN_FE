<script setup lang="ts">
import type { IPost, IReport } from '@/common/interfaces';
import { useReportStore } from '@/stores/report.store';

interface props {
    data: IReport;
}
const Props = defineProps<props>();

const reportStore = useReportStore();

function noViolate(reportId: string){
    reportStore.noViolate(reportId);
}

function violate(reportId: string){
    reportStore.violate(reportId);
}
</script>

<template>
    <router-link class="link" :to="`/post/${data.post?._id}`" target="_blank">
        <div class="wrapper">
            <div class="row">
                <div class="col-9 py-2 px-5 pb-5 info">
                    id: {{ data.post?._id }}
                    <p class="name">{{ data.post?.name }}</p>
                    <hr />
                    <div class="d-flex justify-content-around my-2">
                        <div v-if="data.post?.time" class="time">
                            <img src="@/assets/icons/clock.png" alt="" class="icon">
                            <p class="content">{{ data.post?.time }} phút</p>
                        </div>
                        <div v-if="data.post?.ration" class="ration">
                            <img src="@/assets/icons/person.png" alt="" class="icon">
                            <p class="content">{{ data.post?.ration }} người</p>
                        </div>
                    </div>
                    <!-- <p class="ingre">Nguyên liệu: {{ data.post?.ingredients?.map(i => i.name).join(', ') }}</p> -->
                    <p class="ingre">Tác giả: {{ data.post?.author?.fullname }} - @{{ data.post?.author?.username }}</p>
                    <p class="ingre">Ngày đăng: {{ new Date(data.post?.createdAt).toLocaleDateString('en-GB') }}</p>
                    <p class="ingre">Số lượng báo cáo: {{ data.numOfReport}}</p>
                </div>
                <div class="col-3">
                    <div class="right d-flex flex-column justify-content-center">
                        <button @click.stop.prevent="noViolate(data._id)" class="base-button btn btn-success">Không vi phạm</button>
                        <button @click.stop.prevent="violate(data._id)" class="base-button btn btn-danger">Vi phạm</button>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style scoped lang="scss">
p,
hr {
    margin: 0px;
    padding: 0px;
}

.wrapper {
    width: 100%;
    min-height: 150px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #eeeeee;
    background-color: #eeeeee;
    margin-bottom: 10px;

    &:hover {
        background-color: #dddddd;
    }
}

.base-button{
    width: 90%;
    margin-bottom: 5px;
}
.link{
    text-decoration: none;
    color: black;
}

.row {
    height: 100%;
    min-height: 150px;
}

.right {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.image-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info {
    position: relative;

    .name {
        font-size: 22px;
        margin: 0px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        font-weight: 600;
        color: #ff9933;
    }

    .icon {
        width: 16px;
        height: 16px;
    }

    .content {
        font-size: 16px;
        display: inline;
    }

    .ingre {
        font-size: 16px;
        line-height: 16px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 32px;
    }

    .date {
        position: absolute;
        bottom: 0px;
        left: 30px;
        font-size: 14px;
        color: #666666;
    }
}</style>