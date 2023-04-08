<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { ref } from 'vue';

const authStore = useAuthStore();

const searchData = ref('');

function searchAction() {
    console.log(searchData.value);
}

const isShowMenu = ref(false);
</script>

<template>
    <div class="container-fluid wrapper d-flex align-items-center">
        <router-link to="/">
            <img src="@/assets/images/logo_100_text.png" alt="" srcset="" class="logo">
        </router-link>
        <form class="search-form" action="" method="post">
            <input type="text" class="search-form-input" name="search" placeholder="Gõ vào tên các nguyên liệu...">
            <button type="submit" class="search-form-submit">
                <img src="@/assets/icons/search-interface-symbol.png" alt="" srcset="">
            </button>
        </form>
        <div class="menu" @click="isShowMenu = !isShowMenu">
            <img src="@/assets/icons/burger-bar.png" alt="" srcset="" class="menu-icon">
            <ul class="toggle-list" :class="isShowMenu==true ? 'd-block' : 'd-none'">
                <!-- <li class="profile" v-show="authStore.user?.email"> -->
                <li class="profile">
                    <img src="@/assets/images/default-avatar.jpg" alt="" srcset="">
                    <router-link class="username" to="/getMe">user name</router-link>
                </li>
                <li class="sub-li">
                    <button>sdjfasjf</button>
                    <p>&#8250;</p>
                </li>
                <li class="sub-li">
                    <button>sfbaslhyf</button>
                    <p>&#8250;</p>
                </li>
                <li class="sub-li" v-show="authStore.user?.email">
                    <button @click="authStore.logout()" class="">Logout</button>
                    <p>&#8250;</p>
                </li>
                <li class="sub-li" v-show="!authStore.user?.email">
                    <router-link to="/auth/login" class="" href="#">Login</router-link>
                    <p>&#8250;</p>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
p {
    margin: 0px;
    padding: 0px;
}

.wrapper {
    height: 60px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #DCDCDC;
}

.logo {
    height: 40px;
    width: auto;
}

.search-form {
    width: 100%;
    padding: 0px 8px;
    position: relative;
    margin-right: 10px;
    .search-form-input {
        width: 100%;
        height: 36px;
        border-radius: 99px;
        border: 1px solid #DCDCDC;
        padding: 0px 12px;
        &:focus{
            outline: none;
        }
    }
    
    .search-form-submit{
        position: absolute;
        height: 36px;
        width: 50px;
        top: 0px;
        right: 0px;
        background-color: #ffaa55;
        border-radius: 0px 99px 99px 0px;
    }
    
    .search-form-submit img{
        width: 20px;
        height: 20px;
    }
}

.menu{
    position: relative;
    .menu-icon{
        width: 50px;
        height: 50px;
    }
    .toggle-list{
        border: 1px solid #DCDCDC;
        border-radius: 6px;
        background-color: #ffffff;
        position: absolute;
        top: 45px;
        right: 0px;
        list-style-type: none;
        margin: 0px;
        padding: 0px;
        padding-top: 10px;
        width: 300px;
        color: black;
        text-decoration: none;
        li{
            border-bottom: 1px solid #DCDCDC;
            height: 30px;
            padding-left: 40px;
            padding-right: 14px;
            display: flex;
            align-items: center;
            &:last-child{
                border-bottom: none;
            }
            :deep(a){
                text-decoration: none;
                color: black;
            }
        }
        .profile{
            height: 50px;
            padding-left: 20px;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .username{
                text-decoration: none;
                font-size: 20px;
                font-weight: 400;
            }
        }
        .sub-li{
            display: flex;
            justify-content: space-between;
            p{
                font-size: 30px;
            }
        }
    }   
}
</style>