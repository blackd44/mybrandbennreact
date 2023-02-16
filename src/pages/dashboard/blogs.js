import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InlineDots from "../../components/loaders/inlinedots/inlinedots";


let server = process.env.REACT_APP_SERVER_URL

const DashBlogs = () => {

    let [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios
            .get(server + '/api/blogs')
            .then(res => {
                if (res.status !== 204) {
                    if (res.status === 200) {
                        let data = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        setBlogs(prev => data)
                    }
                    else
                        console.log(res.data)
                }
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <div className="flex-between">
                <h1>Manage Blogs</h1>
                <Link to="/dashboard/blogs/add" className="flex-center-y active-color" style={{ gap: '2vw' }}>
                    <h3>Add new</h3>
                    <svg width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M31.4166 23.0832H23.0833V31.4165H18.9166V23.0832H10.5833V18.9165H18.9166V10.5832H23.0833V18.9165H31.4166M21 0.166504C18.2641 0.166504 15.555 0.705374 13.0274 1.75235C10.4998 2.79932 8.20312 4.33389 6.26857 6.26845C2.36156 10.1755 0.166626 15.4745 0.166626 20.9998C0.166626 26.5252 2.36156 31.8242 6.26857 35.7312C8.20312 37.6658 10.4998 39.2004 13.0274 40.2473C15.555 41.2943 18.2641 41.8332 21 41.8332C26.5253 41.8332 31.8243 39.6382 35.7314 35.7312C39.6384 31.8242 41.8333 26.5252 41.8333 20.9998C41.8333 18.264 41.2944 15.5549 40.2475 13.0273C39.2005 10.4996 37.6659 8.203 35.7314 6.26845C33.7968 4.33389 31.5002 2.79932 28.9725 1.75235C26.4449 0.705374 23.7358 0.166504 21 0.166504Z"
                            style={{ fill: 'var(--active-color)' }} />
                    </svg>
                </Link>
            </div>
            <div className="list blog">
                <hr />
                <ul>{
                    blogs.length === 0 ? (
                        <>
                            <InlineDots />
                        </>
                    ) : (
                        blogs.map(blog => (
                            <li key={blog._id}>
                                <img src={blog?.image} alt={blog?.title} />
                                <aside>
                                    <Link to={"/blogs/" + blog._id}>
                                        <h2>{blog?.title || 'unknown'}</h2>
                                    </Link>
                                    <div className="flex-between">
                                        <div>
                                            <span className="grey-color">{blog?.owner?.username || 'unknown'}</span>
                                            <p className="body" dangerouslySetInnerHTML={{ __html: blog?.content }}>
                                            </p>
                                        </div>
                                        <span>
                                            <Link to={"/dashboard/blogs/edit/" + blog._id}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M23.167 5.8002C23.6598 5.3127 23.6598 4.5002 23.167 4.0377L20.2104 1.1127C19.7429 0.625195 18.9217 0.625195 18.4289 1.1127L16.1041 3.4002L20.8422 8.0877M0.790527 18.5627V23.2502H5.52863L19.5029 9.4127L14.7648 4.7252L0.790527 18.5627Z" fill="#1D1D20">
                                                    </path>
                                                </svg>
                                            </Link>
                                            <Link>
                                                <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.6217 2H14.1994L12.9359 0.75H6.61846L5.35497 2H0.932739V4.5H18.6217M2.19623 20.75C2.19623 21.413 2.46247 22.0489 2.93637 22.5178C3.41027 22.9866 4.05302 23.25 4.72322 23.25H14.8312C15.5014 23.25 16.1441 22.9866 16.618 22.5178C17.0919 22.0489 17.3582 21.413 17.3582 20.75V5.75H2.19623V20.75Z" fill="#1D1D20">
                                                    </path>
                                                </svg>
                                            </Link>
                                        </span>
                                    </div>
                                </aside>
                            </li>
                        ))
                    )
                }</ul>
            </div>
        </>
    );
}

export default DashBlogs;