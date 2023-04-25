<script setup lang="ts">
import MyCard from '@/components/MyCard.vue';
</script>

<template>
    <div class="container wrapper">
        <div class="row">
            <div class="col-8 main-col">
                <img src="/slider-temp/1.webp" alt="" srcset="" class="image-cover">
                <MyCard class="name-and-title">
                    <p class="name">Bắp Su xào tép</p>
                    <p class="title">Đà Nẵng vào mùa tép tươi, tép xào bắp su vừa ngon vừa ngọt.</p>
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
        font-size: 30px;
        font-weight: 500;
    }
}
</style>