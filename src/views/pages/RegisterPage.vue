<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores/Auth.store.js';

const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    username: Yup.string().min(8).max(255).matches(
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        'username is invalid'
    ).required('username is required'),
    fullname: Yup.string().min(3).max(50).required('Fullname is required'),
    password: Yup.string().min(8).max(255).required('Password is required'),
    retypePassword: Yup.string().max(255)
        .required('Please retype your password.')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

async function callRegister(values: any) {
    const authStore = useAuthStore();
    const { email, password, username, fullname } = values;
    await authStore.register(email, fullname, username, password);
}
</script>

<template>
    <div class="container wrapper">
        <div class="row justify-content-center">
            <div class="col-12 my-col">
                <h4 class="header">Đăng ký</h4>
                <div class="card">
                    <div class="card-body">
                        <Form @submit="callRegister" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                            <div class="form-group">
                                <label>Email</label>
                                <Field name="email" type="text" class="form-control"
                                    :class="{ 'is-invalid': errors.email }" />
                                <div class="invalid-feedback">{{ errors.email }}</div>
                            </div>
                            <div class="form-group py-4">
                                <label>Họ và tên</label>
                                <Field name="fullname" type="text" class="form-control"
                                    :class="{ 'is-invalid': errors.fullname }" />
                                <div class="invalid-feedback">{{ errors.fullname }}</div>
                            </div>
                            <div class="form-group">
                                <label>Tên tài khoản</label>
                                <Field name="username" type="text" class="form-control"
                                    :class="{ 'is-invalid': errors.username }" />
                                <div class="invalid-feedback">{{ errors.username }}</div>
                            </div>
                            <div class="form-group py-4">
                                <label>Mật khẩu</label>
                                <Field name="password" type="password" class="form-control"
                                    :class="{ 'is-invalid': errors.password }" />
                                <div class="invalid-feedback">{{ errors.password }}</div>
                            </div>
                            <div class="form-group">
                                <label>Retype password</label>
                                <Field name="retypePassword" type="password" class="form-control"
                                    :class="{ 'is-invalid': errors.retypePassword }" />
                                <div class="invalid-feedback">{{ errors.retypePassword }}</div>
                            </div>
                            <div class="form-group my-3 d-flex flex-column align-items-center">
                                <button class="btn btn-register" :disabled="isSubmitting">
                                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                    Register
                                </button>
                                <router-link to="login" class="btn btn-login">Login</router-link>
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

.btn-register{
    background-color: #ff9933;
    color: white;
    font-size: 20px;
}
.btn-login{
    color: #9933ff;
}

.my-col{
    max-width: 450px;
}
</style>