import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const default_image = process.env.REACT_APP_DEFAULT_IMAGE;

const BlogCard = ({ blog, ...props }) => {
  const navigate = useNavigate();

  const item = useRef();
  const image = useRef();

  useEffect(() => {
    if (item && item.current) {
      item.current.addEventListener("dblclick", (e) => {
        e.preventDefault();
        navigate(`/blogs/${blog._id}`);
      });
    }

    if (image.current && image.current !== null) {
      image.current.onerror = () => {
        image.current.src = default_image;
      };
    }
  }, [blog._id, navigate]);

  return (
    <>
      <li ref={item}>
        <div className="image">
          <img alt="title" src={blog.image} ref={image} />
        </div>
        <div className="body">
          <Link to={"/blogs/" + blog._id}>
            <h3>{blog.title}</h3>
          </Link>
          <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
          <Link className="more" to={"/blogs/" + blog._id}>
            Read More{" "}
            <svg
              class="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </li>
    </>
  );
};

export default BlogCard;
