<script setup lang="ts">
import MyCard from '@/components/MyCard.vue';
import { onMounted, ref } from 'vue';
import { useReportStore } from '@/stores/report.store';
import { storeToRefs } from 'pinia';
import PostReport from '@/components/admin/PostReport.vue';

// use for switch beetween 2 tab
const currentTab = ref(1);

const reportStore = useReportStore()
const {reports, numOfPage, currentPage, isLoading} = storeToRefs(reportStore);
reports.value = [];
currentPage.value = 1;
await reportStore.getReports();

function getNextReports() {
    window.onscroll = async () => {
        window.onscroll = async () => {
            if ( (window.scrollY + window.innerHeight >= document.body.scrollHeight)  ) {
                // console.log('fired');
                if(currentPage.value<numOfPage.value){
                    currentPage.value++;
                    isLoading.value = true;
                    await reportStore.getReports(currentPage.value);
                }
            }
        }
    }
}
onMounted(() => {
    getNextReports();
})
</script>

<template>
    <div class="container wrapper">
        <div class="row">
            <div class="col-9 main-col">
                <MyCard class="main-card">
                    <v-tabs class="tab-header" v-model="currentTab">
                        <v-tab class="left" value="one">Danh sách báo cáo vi phạm</v-tab>
                    </v-tabs>
                    <div class="p-3">
                        <v-window v-model="currentTab" class="windows">
                            <v-window-item value="one" class="window-one">
                                <div v-if="reports.length == 0" class="w-100 d-flex justify-content-center">
                                    <img src="@/assets/images/not-found-1024.png" alt="" class="w-50 opacity-25">
                                </div>
                                <TransitionGroup 
                                    v-else name="list" tag="div">
                                    <div 
                                        v-for="report in reports"
                                        :key="report._id"
                                        class="single-report"
                                    >
                                        <PostReport :data="report"/>
                                    </div>
                                </TransitionGroup>
                            </v-window-item>
                        </v-window>
                    </div>
                </MyCard>
            </div>
            <div class="col-3 feature-col">
                <div class="feature-box">
                    <div class="box box-2">
                        <router-link class="link" to="/admin/collection">
                            <button class="button report">
                                Quản lý bộ sưu tập
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
p {
    margin: 0px;
    padding: 0px;
}

.wrapper {
    max-width: 968px;
}

.link {
    text-decoration: none;
    color: black;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.main-col {}

.main-card {
    padding: 0px;
    overflow: hidden;
}

.tab-header {
    width: 100%;

    :deep(.v-slide-group__content) {
        .v-btn {
            width: 100%;
            background-color: #ffaa55;
            border-radius: 0px;
        }

        .v-slide-group-item--active {
            background-color: white;
            // box-shadow: inset 0px 7px 5px -7px rgba(0, 0, 0, 0.4);
        }

        .v-slide-group-item--active.left {
            // box-shadow: 
            //     inset -7px 0px 5px -7px rgba(0, 0, 0, 0.4),
            //     inset 0px 7px 5px -7px rgba(0, 0, 0, 0.4),
            //     inset 7px 0px 5px -7px rgba(0, 0, 0, 0.4),
            // ;
        }

        .v-slide-group-item--active.right {
            box-shadow:
                inset 7px 0px 5px -7px rgba(0, 0, 0, 0.4),
                inset 0px 7px 5px -7px rgba(0, 0, 0, 0.4),
            ;
        }

        .v-tab__slider {
            display: none;
        }
    }
}

.feature-col {
    .feature-box {
        position: sticky;
        top: 70px;

        .box {
            border-radius: 10px;
            background-color: white;
            box-shadow: 0px 5px 5px 0px #c6c6c6;
            overflow: hidden;
            margin-bottom: 10px;
        }

        .box-1 {
            padding-bottom: 10px;

            .background {
                width: 100%;
                height: 150px;
                object-fit: cover;
                margin-bottom: 40px;
            }

            .not-found {
                object-fit: contain;
            }

            .avatar-and-name {
                position: absolute;
                top: 130px;
                left: 10px;

                .avatar {
                    width: 70px;
                    height: 70px;
                    border-radius: 99px;
                    object-fit: cover;
                    border: 3px solid white;
                }

                .name {
                    height: 20px;
                    color: black;
                    text-decoration: none !important;
                    font-size: 18px;
                    font-weight: 600;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    &:hover {
                        overflow: visible;
                        white-space: pre-line;
                    }
                }

                .username {
                    font-size: 12px;
                    color: #909090;
                    margin-bottom: 10px;
                }
            }
        }

        .box-2 {
            padding: 15px 10px;

            .button {
                border-radius: 6px;
                height: 35px;
                font-size: 18px;
                font-weight: 500;
                border: 1px solid #c6c6c6;
                margin-bottom: 5px;
                width: 100%;

                .icon {
                    width: 20px;
                    height: 20px;
                }
            }

            .btn-active {
                background-color: #ffaa55;
                color: white;
                border: none;
            }
        }
    }
}</style>