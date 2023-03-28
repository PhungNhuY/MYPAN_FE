import { ToastType, useToasts } from '@/components/toast/store';

export function showErrorNotificationFunction(message: string, title?: string): void {
    if (!message) return;
    const { appendToast } = useToasts();
    appendToast({ message, type: ToastType.ERROR, title: title || '' });
}

export function showSuccessNotificationFunction(message: string, title?: string): void {
    if (!message) return;
    const { appendToast } = useToasts();
    appendToast({ message, type: ToastType.SUCCESS, title: title || '' });
}