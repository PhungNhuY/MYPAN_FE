<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ToastType } from './store';

interface Props {
    id: string;
    type: ToastType;
    title: string;
    message: string;
    isAutoClose: boolean;
    duration: number;
}

const props = withDefaults(defineProps<Props>(), {
    type: ToastType.INFO,
    isAutoClose: true,
    duration: 2,
});

// Defining emits
// for closing a notification
const emit = defineEmits<{
    (e: 'close'): void;
}>();

const timer = ref<number>(-1);
const startedAt = ref<number>(0);
const delay = ref<number>(0);

onMounted(() => {
    if (props.isAutoClose) {
        startedAt.value = Date.now();
        delay.value = props.duration * 1000;
        timer.value = window.setTimeout(close, delay.value);
    }
});

const close = () => {
    emit('close');
};
</script>

<template>
    <div
        class="toast-wrapper"
        :style="`--toast-duration: ${duration}s`"
        @click.prevent="close"
    >
        <v-alert :type="type || 'info'" density="compact">
            <v-alert-title>{{ title || '' }}</v-alert-title>
            {{ message }}
        </v-alert>
    </div>
</template>

<style lang="scss" scoped>
.toast-wrapper {
    cursor: pointer;
    max-width: 450px;
    position: relative;
    background: white;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transition: all 0.2s ease-in-out;
    border-radius: 4px;
}
</style>
