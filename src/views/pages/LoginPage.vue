<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router'
import {sendForgotPassEmail} from '@/services/auth.service';
import { useAuthStore } from '@/stores/Auth.store.js';
import { ref } from 'vue';
const route = useRoute();

const schema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').max(255).required('Vui lòng nhập email.'),
    password: Yup.string().max(255).required('Vui lòng nhập mật khẩu')
});


async function callLogin(values: any) {
    const authStore = useAuthStore();

    // get redirect url
    if(route.query.redirect){
        authStore.returnUrl = route.query.redirect as string;
    }

    const { email, password } = values;
    await authStore.login(email, password);
}

const fogotEmail = ref('');
async function send(){
    await sendForgotPassEmail(fogotEmail.value);
}
</script>

<template>
    <!-- Modal box - show when cofirm report post -->
    <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="emailModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="emailModalLabel">Nhập email của bạn</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <input type="email" class="form-control" placeholder="Email" v-model="fogotEmail">
              <p class="pt-1">Chúng tôi sẽ gửi một email cập nhật mật khẩu cho bạn.</p>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="send">Gửi</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container wrapper">
        <div class="row justify-content-center">
            <div class="col-12 my-col">
                <h4 class="header">Đăng nhập</h4>
                <div class="card">
                    <div class="card-body">
                        <Form @submit="callLogin" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                            <div class="form-group">
                                <label>Email</label>
                                <Field name="email" type="text" class="form-control"
                                    :class="{ 'is-invalid': errors.email }" />
                                <div class="invalid-feedback">{{ errors.email }}</div>
                            </div>
                            <div class="form-group py-4">
                                <label>Mật khẩu</label>
                                <Field name="password" type="password" class="form-control"
                                    :class="{ 'is-invalid': errors.password }" />
                                <div class="invalid-feedback">{{ errors.password }}</div>
                            </div>
                            <div class="form-group my-2 d-flex flex-column align-items-center">
                                <button class="btn btn-login" :disabled="isSubmitting">
                                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                    Đăng nhập
                                </button>
                                <router-link to="register" class="btn btn-register">Đăng ký</router-link>
                                <button class="forgot" data-bs-toggle="modal" data-bs-target="#emailModal">Quên mật khẩu</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.btn{
    width: 100%;
}

.header{
    text-align: center;
    font-size: 40px;
}

.form-control:focus{
    box-shadow: none;
}

.btn-login{
    background-color: #ff9933;
    color: white;
    font-size: 20px;
}
.btn-register{
    color: #9933ff;
}

.my-col{
    max-width: 450px;
}
</style>