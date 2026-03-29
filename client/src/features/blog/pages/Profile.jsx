import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useBlogs } from "../hooks/useBlog";

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const blogs = useSelector(state => state.blog.blogs);
    const [updateBlogData, setUpdateBlogData] = useState({
        title: "",
        content: ""
    });

    const { handleGetMyBlogs, handleUpdateBlog, handleDeleteBlog } = useBlogs();

    useEffect(() => {
        handleGetMyBlogs();
    }, []);

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
            <div>
                Username : {user.username}
                email : {user.email}
                blogs : {blogs.length}
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
            <div>
                <h1>Blogs : </h1>
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
            </div>
        </div>
    )
}

export default Profile