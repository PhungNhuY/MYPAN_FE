<script setup lang="ts">
import MyCard from '@/components/MyCard.vue';
</script>

<template>
    <div class="container wrapper">
        <div class="row">
            <div class="col-8 main-col">
                <img src="/slider-temp/1.webp" alt="" srcset="" class="image-cover">
                <MyCard :active="true" class="name-and-title">
                    <p class="name">Bắp Su xào tép</p>
                    <p class="title">Đà Nẵng vào mùa tép tươi, tép xào bắp su vừa ngon vừa ngọt.</p>
                    <hr/>
                    <div class="d-flex justify-content-around">
                        <div class="ration">
                            <img src="@/assets/icons/person.png" alt="" class="icon">
                            <p class="content">3 người</p>
                        </div>
                        <div class="time">
                            <img src="@/assets/icons/clock.png" alt="" class="icon">
                            <p class="content">30 phút</p>
                        </div>
                    </div>
                </MyCard>
                <MyCard class="ingredient">
                    <p class="title">Nguyên liệu</p>
                    <table class="the-table">
                        <tr>
                            <th class="pl-2">Nguyên liệu</th>
                            <th>Định lượng</th>
                        </tr>
                        <tr
                            class="single-ingre"
                            v-for="i in 10"
                            :key="i"
                            :class="{ 'highlight': (i % 2 == 0) }"
                        >
                            <td class="pl-2">Nguyên liệu {{ i }}</td>
                            <td>{{ i }} gram</td>
                        </tr>
                    </table>
                </MyCard>
                <MyCard class="steps">
                    <p class="title">Cách làm</p>
                    <div 
                        class="single-step"
                        v-for="i in 3"
                        :key="i"
                    >
                        <div class="d-flex">
                            <div class="left">
                                <p class="order">{{ i }}</p>
                            </div>
                            <div class="right">
                                <p>Gân bò rửa sạch, cắt khúc vừa ăn. Hầm với nước lọc, ít gừng giã cho tới khi gân bò chín -> nêm nếm gia vị vừa ăn -> cho bò viên, ớt sừng vào.<br>
                                Gân bò rửa sạch, cắt khúc vừa ăn. Hầm với nước lọc, ít gừng giã cho tới khi gân bò chín -> nêm nếm gia vị vừa ăn -> cho bò viên, ớt sừng vào.<br>
                                Gân bò rửa sạch, cắt khúc vừa ăn. Hầm với nước lọc, ít gừng giã cho tới khi gân bò chín -> nêm nếm gia vị vừa ăn -> cho bò viên, ớt sừng vào.</p>
                            </div>
                        </div>
                        <div class="images d-flex justify-content-around">
                            <img src="/slider-temp/1.webp" alt="" srcset="" class="image contain-3">
                            <img src="/slider-temp/1.webp" alt="" srcset="" class="image contain-3">
                            <img src="/slider-temp/1.webp" alt="" srcset="" class="image contain-3">
                        </div>
                    </div>
                </MyCard>
            </div>
            <div class="col-4 feature-col">
                <div class="the-card"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
p{
    margin: 0px;
    padding: 0px;
}
.wrapper{
    max-width: 968px;
}
.main-col {
}

.feature-col {
    .the-card{
        // position: fixed;
        // width: inherit;
        background-color: black;
        height: 85vh;
    }
}

.image-cover{
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 5px 5px 0px #c6c6c6;
}

.name-and-title{
    .name{
        font-size: 40px;
    }
    .title{
        font-size: 18px;
    }
    .ration,.time{
        display: flex;
        align-items: center;
        .icon{
            width: 20px;
            height: 20px;
            margin-top: -5px;
        }
        .content{
            font-size: 20px;
            margin-left: 5px;
        }
    }
}
.ingredient{
    .the-table{
        width: 100%;
        tr{
            width: 100%;
            height: 30px;
            td{
                width: 50%;
            }
        }
    }
    .title{
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    .single-ingre{
        font-size: 16px;
        &:hover{
            background-color: #ffddbc;
            font-weight: 500;
        }
    }
    .highlight{
        background-color: #e4e4e5;
    }
}

.steps{
    .title{
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    .single-step{
        margin-bottom: 15px;
        .left{
            padding-right: 5px;
            .order{
                text-align: center;
                font-size: 18px;
                font-weight: 600;
                color: white;
                background-color: #ffaa55;
                width: 24px;
                height: 24px;
                border-radius: 99px;
            }
        }
        .images{
            .image{
                border-radius: 10px;
                max-height: 300px;
            }
            .contain-1{
                max-width: 100%;
            }
            .contain-2{
                max-width: 49%;
            }
            .contain-3{
                max-width: 32%;
            }
        }
    }
}
</style>