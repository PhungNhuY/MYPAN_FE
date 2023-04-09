<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores/Auth.store.js';

const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
});

async function callLogin(values: any) {
    const authStore = useAuthStore();
    const { email, password } = values;
    await authStore.login(email, password);
}
</script>

<template>
    <div class="container wrapper">
        <div class="row">
            <div class="col-6 offset-3">
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
</style>