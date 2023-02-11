import { Link } from "react-router-dom";

const BlogCard = ({ blog, ...props }) => {
    return (
        <>
            <li>
                <img alt="title" src={blog.image} />
                <div className="body">
                    <Link>
                        <h2>{blog.title}</h2>
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                    <Link>
                        <u class="more">Read More</u>
                    </Link>
                </div>
            </li>
        </>
    );
}

export default BlogCard;