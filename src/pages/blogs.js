import { useEffect, useState } from "react";
import BlogCard from "../components/blogCard";
let server = 'http://localhost:4444'

const Blogs = () => {

    let [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch(server + '/api/blogs').then(async res => {
            if (res.status !== 204) {
                let body = await res.json()
                if (res.status === 200)
                    setBlogs(prev => body)
                else
                    console.log(body)
            }
        })
    }, [])

    return (
        <>
            <main>
                <section className="first ">
                    <div className="w-full grass-box">
                        <div className="blogs list">
                            <form className="search">
                                <label className="w-full">
                                    <input type="text" name="search" className="w-full" required />
                                    <span>Search</span>
                                </label>
                                <button type="submit">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15 10V13.3333H3.33337V10H15ZM15 18.3333V21.6667H3.33337V18.3333H15ZM30 26.6667V30H3.33337V26.6667H30ZM32.1834 19.1667C32.9167 18.0333 33.3334 16.6667 33.3334 15.1833C33.3334 11.0167 30 7.68335 25.8334 7.68335C21.6667 7.68335 18.3334 11.0167 18.3334 15.1833C18.3334 19.35 21.6667 22.6833 25.8334 22.6833C27.2834 22.6833 28.65 22.2667 29.8 21.55L35 26.6667L37.3167 24.35L32.1834 19.1667ZM25.8334 19.35C23.5334 19.35 21.6667 17.5 21.6667 15.1833C21.6667 12.8667 23.5334 11.0167 25.8334 11.0167C28.1334 11.0167 30 12.8833 30 15.1833C30 17.4833 28.1334 19.35 25.8334 19.35Z"
                                            fill="#D9D9D9" />
                                    </svg>
                                </button>
                            </form>
                            <ul className="bloglist">
                                {
                                    blogs.map(blog => (
                                        <BlogCard key={blog._id} blog={blog} ></BlogCard>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Blogs;