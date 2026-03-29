import { useDispatch } from "react-redux";
import {
    create,
    updateBlog,
    deleteBlog,
    getBlogs,
    getMyBlogs
} from "../apis/blog.api";

import {
    setBlogs,
    setError,
    setLoading,
    addBlog,
    removeBlog,
    updateBlogInState
} from "../blogSlice";

export function useBlogs() {
    const dispatch = useDispatch();

    function handleError(error) {
        const message = error?.msg || "Unexpected error occurred";
        dispatch(setError(message));
        console.error("Blogs Error:", error);
    }

    // GET Blogs
    async function handleGetBlogs() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await getBlogs();
            dispatch(setBlogs(res.blogs));
            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    // GET user's Blogs
    async function handleGetMyBlogs() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await getMyBlogs();
            dispatch(setBlogs(res.blogs));
            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    // CREATE BlogS
    async function handleCreateBlog(data) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await create(data);

            dispatch(addBlog(res.blog));

            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    // UPDATE Blog
    async function handleUpdateBlog(id, data) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await updateBlog(id, data);

            dispatch(updateBlogInState(res.blog));

            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    // DELETE Blog
    async function handleDeleteBlog(id) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            await deleteBlog(id);

            dispatch(removeBlog(id));

            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleCreateBlog,
        handleGetBlogs,
        handleUpdateBlog,
        handleDeleteBlog,
        handleGetMyBlogs
    };
}