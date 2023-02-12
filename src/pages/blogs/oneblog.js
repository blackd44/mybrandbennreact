import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

let server = process.env.REACT_APP_SERVER_URL
const default_profile = process.env.REACT_APP_DEFAULT_PROFILE

const Comment = ({ comment }) => {

    let profileRef = useRef()

    useEffect(() => {
        if (!profileRef.current)
            return

        profileRef.current.onerror = () => {
            profileRef.current.src = default_profile
        }
    }, [])

    return (
        <>
            <li>
                <img className="profile-image" ref={profileRef} src={comment?.owner?.profile || default_profile} alt={comment?.owner?.username} />
                <aside>
                    <div>
                        <b>@{comment?.owner?.username}</b>
                        <span>{moment(comment?.createdAt).format('DD-MMM')}</span>
                    </div>
                    <div>{`${comment?.message}` || 'undefined'}</div>
                    <div>
                        <p data-info="likes">
                            <svg width=" 22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.2294 11.25C20.2294 10.0013 19.4378 9 18.4703 9H12.9116L13.756 3.85875C13.7735 3.74625 13.7823 3.6225 13.7823 3.49875C13.7823 3.0375 13.6328 2.61 13.3953 2.30625L12.463 1.125L6.67567 8.5275C6.35024 8.94375 6.15674 9.50625 6.15674 10.125V21.375C6.15674 21.9717 6.34208 22.544 6.67197 22.966C7.00186 23.3879 7.44928 23.625 7.91582 23.625H15.8317C16.5617 23.625 17.1862 23.0625 17.45 22.2525L20.1062 14.3212C20.1854 14.0625 20.2294 13.7925 20.2294 13.5V11.25ZM0.879517 23.625H4.39767V10.125H0.879517V23.625Z" fill="#8B8B97"></path>
                            </svg>
                            <b>{comment?.likes?.length || 0}</b>
                        </p>
                        <b>Reply</b>
                    </div>
                </aside>
            </li>
        </>
    )
}

const OneBlog = (props) => {

    const [id] = useState(useParams().id)
    const [blog, setBlog] = useState(null)
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState({
        length: 0,
        values: []
    })

    useEffect(() => {

        axios
            .get(server + '/api/blogs/' + id)
            .then(res => {
                if (res.status !== 204) {
                    if (res.status === 200) {
                        setBlog(prev => res.data)
                        setLikes(prev => res.data.likes)
                    }
                    else
                        console.log(res.data)
                }
            }).catch(e => console.log({ error: e }))

        axios
            .get(server + '/api/blogs/' + id + '/comments')
            .then(res => {
                if (res.status !== 204) {
                    if (res.status === 200) {
                        setComments(prev => res.data)
                    }
                    else
                        console.log(res.data)
                }
            }).catch(e => console.log({ error: e }))

    }, [id])

    useEffect(() => {
        document.title = blog?.title || 'blog'
    }, [blog])

    return (
        <>
            <main>
                <section className="first ">
                    <div className="w-full grass-box">
                        <img
                            className="image"
                            src={blog !== null ? blog.image : 'username'}
                            alt='blogimage' />
                        <div className="blogs blog">
                            <div style={{ textAlign: 'center' }}>
                                <h2 className="h">{
                                    blog !== null ? blog.title : 'title'
                                }</h2>
                                <p className="gray-color">{
                                    blog !== null ? blog?.owner?.username : 'username'
                                }</p>
                            </div>
                            <div
                                className="body"
                                dangerouslySetInnerHTML={{ __html: blog !== null ? blog.content : 'body' }}>
                            </div>

                            <div className="flex-row " style={{ justifyContent: 'space-between' }}>
                                <div className="info">
                                    <p data-info="likes">
                                        <svg width=" 22" height="27" viewBox="0 0 22 27" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20.2294 11.25C20.2294 10.0013 19.4378 9 18.4703 9H12.9116L13.756 3.85875C13.7735 3.74625 13.7823 3.6225 13.7823 3.49875C13.7823 3.0375 13.6328 2.61 13.3953 2.30625L12.463 1.125L6.67567 8.5275C6.35024 8.94375 6.15674 9.50625 6.15674 10.125V21.375C6.15674 21.9717 6.34208 22.544 6.67197 22.966C7.00186 23.3879 7.44928 23.625 7.91582 23.625H15.8317C16.5617 23.625 17.1862 23.0625 17.45 22.2525L20.1062 14.3212C20.1854 14.0625 20.2294 13.7925 20.2294 13.5V11.25ZM0.879517 23.625H4.39767V10.125H0.879517V23.625Z"
                                                fill="#8B8B97" />
                                        </svg>
                                        <span>{likes.length}</span>
                                    </p>
                                    <p>
                                        <svg width="21" height="23" viewBox="0 0 21 23" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.6029 16.0879C18.517 16.0879 19.2904 16.4219 19.9233 17.0898C20.5561 17.7227 20.8725 18.4785 20.8725 19.3574C20.8725 20.2715 20.5385 21.0625 19.8705 21.7305C19.2377 22.3633 18.4818 22.6797 17.6029 22.6797C16.724 22.6797 15.9506 22.3633 15.2826 21.7305C14.6498 21.0625 14.3334 20.2715 14.3334 19.3574C14.3334 19.0059 14.351 18.7598 14.3861 18.6191L6.42325 13.9785C5.75528 14.5762 4.98184 14.875 4.10294 14.875C3.18888 14.875 2.39786 14.541 1.72989 13.873C1.06192 13.2051 0.727939 12.4141 0.727939 11.5C0.727939 10.5859 1.06192 9.79492 1.72989 9.12695C2.39786 8.45898 3.18888 8.125 4.10294 8.125C4.98184 8.125 5.75528 8.42383 6.42325 9.02148L14.3334 4.43359C14.2631 4.08203 14.2279 3.81836 14.2279 3.64258C14.2279 2.72852 14.5619 1.9375 15.2299 1.26953C15.8979 0.601562 16.6889 0.267578 17.6029 0.267578C18.517 0.267578 19.308 0.601562 19.976 1.26953C20.644 1.9375 20.9779 2.72852 20.9779 3.64258C20.9779 4.55664 20.644 5.34766 19.976 6.01562C19.308 6.68359 18.517 7.01758 17.6029 7.01758C16.7592 7.01758 15.9858 6.70117 15.2826 6.06836L7.37247 10.709C7.44278 11.0605 7.47794 11.3242 7.47794 11.5C7.47794 11.6758 7.44278 11.9395 7.37247 12.291L15.3881 16.9316C16.0209 16.3691 16.7592 16.0879 17.6029 16.0879Z"
                                                fill="#8B8B97" />
                                        </svg>
                                        <span>10</span>
                                    </p>
                                </div>
                                <div className="date gray-color">{moment(blog?.createdAt).format('MMM DD, YYYY')}</div>
                            </div>
                            <div className="comments">
                                <div>
                                    <span className="n">{comments?.length} Comments</span>
                                </div>
                                {/* <form action="" method="post" name="addComment">
                                    <img className="profile-image" alt="profile" src="/images/elementor-placeholder-image.webp" />
                                    <aside>
                                        <textarea placeholder="add a comment..." required></textarea>
                                        <div>
                                            <button type="reset">Cancel</button>
                                            <button type="submit">Comment</button>
                                        </div>
                                    </aside>
                                </form> */}
                                <ul>
                                    {
                                        comments.values.map(comment => (
                                            <Comment key={comment._id} comment={comment}></Comment>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/*
                            <p>
                                <b style={{
                                    textAlign: 'end',
                                    display: 'block',
                                    boxSizing: 'border-box'
                                }} onClick="back()">⫷ Back</b>
                                <script>
                                    function back() {
                                        history.back()
                                    }
                                </script> 
                            </p>
                            */}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default OneBlog;