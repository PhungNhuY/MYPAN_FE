<script setup lang="ts">
import { changePassword } from '@/services/auth.service';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
    newPassword: Yup.string().min(8).max(255).required('Vui lòng nhập mật khẩu mới'),
    retypePassword: Yup.string().max(255)
        .required('Vui lòng xác nhận mật khẩu')
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu không hợp lệ'),
});

async function callResetPass(values: any) {
    const {password, newPassword} = values;
    await changePassword(password, newPassword);
}
</script>
<template>
    <div class="container wrapper">
        <div class="row justify-content-center">
            <div class="col-12 my-col">
                <h4 class="header">Đổi mật khẩu</h4>
                <div class="card">
                    <div class="card-body">
                        <Form @submit="callResetPass" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                            <div class="form-group">
                                <label>Mật khẩu</label>
                                <Field name="password" type="password" class="form-control"
                                    :class="{ 'is-invalid': errors.password }" />
                                <div class="invalid-feedback">{{ errors.password }}</div>
                            </div>
                            <div class="form-group py-4">
                                <label>Mật khẩu mới</label>
                                <Field name="newPassword" type="password" class="form-control"
                                    :class="{ 'is-invalid': errors.newPassword }" />
                                <div class="invalid-feedback">{{ errors.newPassword }}</div>
                            </div>
                            <div class="form-group">
                                <label>Xác nhận mật khẩu</label>
                                <Field name="retypePassword" type="password" class="form-control"
                                    :class="{ 'is-invalid': errors.retypePassword }" />
                                <div class="invalid-feedback">{{ errors.retypePassword }}</div>
                            </div>
                            <div class="form-group my-3 d-flex flex-column align-items-center">
                                <button class="btn btn-register" :disabled="isSubmitting">
                                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                    Đổi mật khẩu
                                </button>
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