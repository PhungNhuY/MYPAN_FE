import authStorageService from '@/services/local-storage/authStorage.service';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
): Promise<void> => {
    const isPublic = to?.meta?.private == true ? false : true;
    const onlyWhenLoggedOut = to?.meta?.onlyWhenLoggedOut || false;
    const loggedIn = !!authStorageService.getAccessToken();
    // const refreshToken = localStorageAuthService.getRefreshToken();
    // const refreshTokenExpiredAt = localStorageAuthService.getRefreshTokenExpiredAt();

    if (isPublic) {
        // Do not allow user to visit entry page if they are logged in
        if (loggedIn && onlyWhenLoggedOut) {
            return next('/');
        }
        return next();
    }
    if (!isPublic && !loggedIn) {
        return next({
            path: '/auth/login',
            query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
        });
    }
    if (loggedIn) {
        const requiredPermissions = to?.meta?.requiredPermissions as string || null;
        if (requiredPermissions == 'admin' && authStorageService.getLoginUser().role as string != 'admin'){
            return next('/');
        }
    //     return next({ path: '/404' });
    }
    return next();
};
