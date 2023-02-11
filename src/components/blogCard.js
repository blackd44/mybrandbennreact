import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, ...props }) => {

    const item = useRef()

    useEffect(() => {
        if (item && item.current) {
            item.current.addEventListener('dblclick', e => {
                e.preventDefault()
                window.location.assign(`/blogs/${blog._id}`)
            })
        }
    }, [])

    return (
        <>
            <li ref={item}>
                <img alt="title" src={blog.image} />
                <div className="body">
                    <Link to={'/blogs/' + blog._id}>
                        <h2>{blog.title}</h2>
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                    <Link to={'/blogs/' + blog._id}>
                        <u className="more">Read More</u>
                    </Link>
                </div>
            </li>
        </>
    );
}

export default BlogCard;