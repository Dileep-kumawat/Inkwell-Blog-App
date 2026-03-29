import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogs: [],
    loading: false,
    error: null
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },

        addBlog: (state, action) => {
            state.blogs.unshift(action.payload);
        },

        updateBlog: (state, action) => {
            const updated = action.payload;

            const index = state.blogs.findIndex(
                (blog) => blog._id === updated._id
            )

            if (index !== -1) {
                state.blogs[index] = updated;
            }
        },

        removeBlog: (state, action) => {
            const id = action.payload;

            state.blogs = state.blogs.filter(
                (blog) => blog._id !== id
            )
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { setBlogs, addBlog, updateBlog, removeBlog, setLoading, setError } = blogSlice.actions;

export default blogSlice.reducer;