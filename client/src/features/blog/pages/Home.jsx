import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth"
import { useEffect, useState } from "react";
import { useBlogs } from "../hooks/useBlog";
import { useSelector } from "react-redux";

const Home = () => {
    const [createBlogData, setCreateBlogData] = useState({
        title: "",
        content: ""
    });

    const [updateBlogData, setUpdateBlogData] = useState({
        title: "",
        content: ""
    });

    const { handleLogout } = useAuth();

    const navigate = useNavigate();

    const blogs = useSelector(state => state.blog.blogs);

    const logout = async () => {
        const { success } = await handleLogout();
        if (success) navigate("/login");
    }

    const { handleGetBlogs, handleCreateBlog, handleUpdateBlog, handleDeleteBlog } = useBlogs();

    useEffect(() => {
        handleGetBlogs();
    }, []);

    console.log(blogs);

    const handleCreation = async (e) => {
        e.preventDefault();

        const { success } = await handleCreateBlog(createBlogData);

        if (success) console.log("Blog created");
    }

    const update = async (id, blog) => {
        const blogdata = { ...updateBlogData };
        if (updateBlogData.title === "") blogdata.title = blog.title;
        if (updateBlogData.content === "") blogdata.content = blog.content;
        const { success } = await handleUpdateBlog(id, blogdata);

        if (success) console.log("Blog Updated");
    }

    const remove = async (id) => {
        const { success } = await handleDeleteBlog(id);

        if (success) console.log("Blog deleted");
    }

    return (
        <div>
            Welcome from home
            <h1>Logout : <button onClick={logout}>Logout</button></h1>

            <div>
                <h1>create blog</h1>
                <form onSubmit={handleCreation}>
                    <input
                        value={createBlogData.title}
                        onChange={(e) => {
                            setCreateBlogData(prev => {
                                return {
                                    ...prev,
                                    title: e.target.value
                                }
                            })
                        }}
                        type="text" placeholder="title" />
                    <input
                        value={createBlogData.content}
                        onChange={(e) => {
                            setCreateBlogData(prev => {
                                return {
                                    ...prev,
                                    content: e.target.value
                                }
                            })
                        }}
                        type="text" placeholder="content" />
                    <button>create blog</button>
                </form>
            </div>

            <div>
                <h1>update blog</h1>
                <form>
                    <input
                        value={updateBlogData.title}
                        onChange={(e) => {
                            setUpdateBlogData(prev => {
                                return {
                                    ...prev,
                                    title: e.target.value
                                }
                            })
                        }}
                        type="text" placeholder="title" />
                    <input
                        value={updateBlogData.content}
                        onChange={(e) => {
                            setUpdateBlogData(prev => {
                                return {
                                    ...prev,
                                    content: e.target.value
                                }
                            })
                        }}
                        type="text" placeholder="content" />
                </form>
            </div>

            {/* Blogs */}
            {blogs.map((blog) => {
                return <div key={blog._id}>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                    <button
                        onClick={() => {
                            update(blog._id, blog);
                        }}
                    >Update</button>
                    <button
                        onClick={() => {
                            remove(blog._id);
                        }}
                    >Delete</button>
                </div>
            })}

            <div>
                <h1>Profile page : <Link to='/profile'>click</Link></h1>
            </div>
        </div>
    )
}

export default Home
