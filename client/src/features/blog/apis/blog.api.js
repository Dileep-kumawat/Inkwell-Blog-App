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

export async function create({ title, content }) {
    const res = await api.post("/api/blogs/create", {
        title,
        content
    });

    return res.data;
}

export async function getBlogs() {
    const res = await api.get("/api/blogs/");

    return res.data;
}

export async function updateBlog(id, { title, content }) {
    const res = await api.patch("/api/blogs/" + id, {
        title,
        content
    });

    return res.data;
}

export async function deleteBlog(id) {
    const res = await api.delete("/api/blogs/" + id);

    return res.data;
}

export async function getMyBlogs() {
    const res = await api.get("/api/blogs/mine");

    return res.data;
}