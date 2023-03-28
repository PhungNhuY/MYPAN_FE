<script setup lang="ts">
import ToastItem from './ToastItem.vue';
import { useToasts } from './store';

const { toasts, removeToast } = useToasts();
</script>

<template>
    <div class="toast-wrapper">
        <transition-group name="toast" tag="div" class="toasts">
            <ToastItem
                v-for="item in toasts"
                :key="item.id"
                :id="item.id"
                :type="item.type"
                :title="item.title"
                :message="item.message"
                :is-auto-close="item.isAutoClose"
                :duration="item.duration"
                @close="
                    () => {
                        removeToast(item.id);
                    }
                "
            ></ToastItem>
        </transition-group>
    </div>
    <slot />
</template>

<style lang="scss">
.toasts {
    z-index: 100;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.8rem;
}

.toast-enter-active {
    animation: toast-slide-in 0.5s ease;
}
.toast-leave-active {
    animation: toast-slide-in 0.5s ease reverse;
}

@keyframes toast-slide-in {
    from {
        right: -100%;
    }

    80% {
        right: 0.8rem;
    }

    to {
        right: 0rem;
    }
}
</style>
