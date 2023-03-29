import {isValidJSON} from '@/common/helper';

export class LocalStorageService{
    getFromLocalStorage(key: string): string{
        if(!localStorage){
            return '';
        }
        return localStorage.getItem(key) || '';
    }

    setToLocalStorage(key: string, value: string): void {
        if(!localStorage){
            console.error("don't have localStorage");
            return;
        }
        localStorage.setItem(key, value);
    }

    getObjectFromKey<T>(key: string): T | Record<string, unknown> {
        const jsonString = this.getFromLocalStorage(key);
        if(isValidJSON(jsonString)){
            return JSON.parse(jsonString) as T;
        }
        return {};
    }
}

export const storage = new LocalStorageService();