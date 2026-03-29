import { register, login, logout, getMe } from '../apis/auth.api';
import { useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '../authSlice'

export function useAuth() {
    const dispatch = useDispatch();

    function handleError(error) {
        const message = error?.msg || "Unexpected error occurred";
        const status = error?.status || 0;

        if (status === 401) {
            dispatch(setError("Invalid email or password"));
        } else if (status === 409) {
            dispatch(setError("User already exists"));
        } else if (status === 0) {
            dispatch(setError("Check your internet connection"));
        } else {
            dispatch(setError(message));
        }

        console.error("Auth Error:", error);
    }

    async function handleRegister({ username, email, password }) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await register({ username, email, password });
            dispatch(setUser(res.user));
            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: true };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await login({ email, password });
            dispatch(setUser(res.user));
            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await getMe();
            dispatch(setUser(res.user));
            return { success: true };
        } catch (error) {
            dispatch(setUser(null));
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogout() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            await logout();
            dispatch(setUser(null));
            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe
    };
}