import type { IUser } from '@/common/interfaces';
import { storage } from './localStorage.service';
import { isStringify } from '@/common/helper';

export const enum AUTH_SERVICE_KEY {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    USER = 'USER',
    ACCESS_TOKEN_EXPIRED_AT = 'ACCESS_TOKEN_EXPIRED_AT',
    REFRESH_TOKEN_EXPIRED_AT = 'REFRESH_TOKEN_EXPIRED_AT',
}

class AuthStorageService{
    // ACCESS_TOKEN
    setAccessToken(token: string): void {
        storage.setToLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, token);
    }
    getAccessToken(): string {
        return storage.getFromLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
    }
    resetAccessToken(): void {
        storage.setToLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, '');
    }

    // REFRESH_TOKEN
    setRefreshToken(token: string): void {
        storage.setToLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, token);
    }
    getRefreshToken(): string {
        return storage.getFromLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN);
    }
    resetRefreshToken(): void {
        storage.setToLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, '');
    }

    // LOGIN USER
    setLoginUser(user: null | IUser): void {
        if (!user) {
            storage.setToLocalStorage(AUTH_SERVICE_KEY.USER, '');
        }
        if (!isStringify(user)) {
            return;
        }
        storage.setToLocalStorage(AUTH_SERVICE_KEY.USER, JSON.stringify(user));
    }
    getLoginUser(): IUser {
        return storage.getObjectFromKey(AUTH_SERVICE_KEY.USER) as IUser;
    }

    resetAll(): void {
        this.resetAccessToken();
        this.resetRefreshToken();
        this.setLoginUser(null);
    }
}

const authStorageService = new AuthStorageService();
export default authStorageService;