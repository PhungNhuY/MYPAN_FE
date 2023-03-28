import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
}

export interface IToast {
    id: string;
    type: ToastType;
    title: string;
    message: string;
    isAutoClose: boolean;
    duration: number;
}

export interface IToastOption {
    type?: ToastType;
    title: string;
    message: string;
    isAutoClose?: boolean;
    duration?: number;
}

const defaultToastOption = {
    type: 'info',
    isAutoClose: true,
    duration: 3,
};

function createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}

export const useToasts = defineStore('toasts', () => {
    const toasts = ref<IToast[]>([]);

    // function to create Toast
    const appendToast = (option: IToastOption) => {
        const _options = Object.assign({ ...defaultToastOption }, option);
        toasts.value.push(
            ...[
                {
                    id: createUUID(),
                    ..._options,
                },
            ],
        );
    };

    const removeToast = (id: string) => {
        const index = toasts.value.findIndex((item) => item.id === id);
        if (index !== -1) toasts.value.splice(index, 1);
    };

    return {
        toasts,
        appendToast,
        removeToast,
    };
});
