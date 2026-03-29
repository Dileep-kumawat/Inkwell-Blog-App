import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.reject({
                msg: error.response.data?.msg || "Something went wrong",
                status: error.response.status,
                success: false
            });
        }

        return Promise.reject({
            msg: "Network error",
            status: 0,
            success: false
        });
    }
);

export async function register({ username, email, password }) {
    const res = await api.post("/api/auth/register", {
        username,
        email,
        password
    });

    return res.data;
}

export async function login({ email, password }) {
    const res = await api.post("/api/auth/login", {
        email,
        password
    });

    return res.data;
}

export async function logout() {
    const res = await api.get("/api/auth/logout");

    return res.data;
}

export async function getMe() {
    const res = await api.get("/api/auth/get-me");

    return res.data;
}