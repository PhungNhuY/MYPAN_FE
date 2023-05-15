<template>
    <div class="container-fluid wrapper d-flex justify-content-around align-items-center">
        <img src="@/assets/images/logo_100_text.png" alt="" class="logo">
        <p class="des">Sứ mệnh của MYPAN là làm cho việc vào bếp vui hơn mỗi ngày. Chúng tôi muốn hỗ trợ các đầu bếp gia đình trên toàn thế giới để họ có thể giúp đỡ nhau qua việc chia sẻ các món ngon và bí quyết nấu ăn của mình.</p>
        <div class="sosial">
            <img src="@/assets/icons/facebook.png" alt="" srcset="" class="sosial-icon">
            <img src="@/assets/icons/instagram.png" alt="" srcset="" class="sosial-icon">
            <img src="@/assets/icons/youtube.png" alt="" srcset="" class="sosial-icon">
            <img src="@/assets/icons/twitter.png" alt="" srcset="" class="sosial-icon">
            <img src="@/assets/icons/tiktok.png" alt="" srcset="" class="sosial-icon">
        </div>
    </div>
</template>

<style scoped lang="scss">
p{
    margin: 0px;
}
.wrapper{
    background-color: white;
    height: 100px;
    margin-top: 50px;
}
.logo{
    height: 50%;
    width: auto;
}
.des{
    max-width: 600px;
}

.sosial{
    .sosial-icon{
        width: 20px;
        height: 20px;
        margin-left: 3px;
    }
}
</style>