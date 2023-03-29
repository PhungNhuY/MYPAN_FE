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

export function isValidJSON(str: string) {
    try {
        const object = JSON.parse(str);
        if (object && typeof object === 'object') return true;
        return false;
    } catch (error) {
        return false;
    }
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
    try {
        JSON.stringify(obj);
    } catch (e) {
        return false;
    }
    return true;
}