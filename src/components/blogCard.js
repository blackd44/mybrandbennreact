import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const default_image = process.env.REACT_APP_DEFAULT_IMAGE

const BlogCard = ({ blog, ...props }) => {
    const navigate = useNavigate()

    const item = useRef()
    const image = useRef()

    useEffect(() => {
        if (item && item.current) {
            item.current.addEventListener('dblclick', e => {
                e.preventDefault()
                navigate(`/blogs/${blog._id}`)
            })
        }

        if (image.current && image.current !== null) {
            image.current.onerror = () => {
                image.current.src = default_image
            }
        }
    }, [blog._id])

    return (
        <>
            <li ref={item}>
                <img alt="title" src={blog.image} ref={image} />
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