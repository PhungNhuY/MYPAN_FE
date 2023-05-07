<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth.store';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import SearchForm from '../SearchForm.vue';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);

const isShowMenu = ref(false);
const target = ref(null);
onClickOutside(target, () => isShowMenu.value = false);
</script>

<template>
    <div class="container-fluid wrapper d-flex align-items-center">
        <router-link to="/">
            <img src="@/assets/images/logo_100_text.png" alt="" srcset="" class="logo">
        </router-link>

        <SearchForm />

        <div class="menu" @click="isShowMenu = !isShowMenu" ref="target">
            <img src="@/assets/icons/burger-bar.png" alt="" srcset="" class="menu-icon">
            <ul class="toggle-list" :class="isShowMenu==true ? 'd-block' : 'd-none'">
                <li class="profile" v-show="authStore.user?.email">
                    <img v-if="!user?.avatar_link" src="@/assets/images/default-avatar.jpg" alt="" srcset="">
                    <img v-else :src="user.avatar_link" alt="" srcset="">
                    <router-link class="username" to="/profile">{{ user?.fullname }}</router-link>
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
    <div class="the-block"></div>
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
    position: fixed;
    z-index: 2;
    background-color: #ffffff;
}

.logo {
    height: 40px;
    width: auto;
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
        z-index: 2;
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
                object-fit: cover;
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

.the-block{
    height: 80px;
}
</style>