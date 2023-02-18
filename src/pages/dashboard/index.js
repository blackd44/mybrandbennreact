import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DashBlogs from "./blogs";
import Footer from "../../components/footer";
import DashMessages from "./messages";
import Cookie from 'js-cookie'
import axios from "axios";
import AddBlog from "./blogs/add";

const default_profile = process.env.REACT_APP_DEFAULT_PROFILE
const server = process.env.REACT_APP_SERVER_URL

const Dashboard = () => {
    let navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [token] = useState(Cookie.get('token'))
    const profileRef = useRef()

    useEffect(() => {
        if (!token || token === null) {
            console.log('hello')
            navigate('/')
            return
        }
        axios
            .get(server + '/api/users/user', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(res => {
                if (res.status !== 204) {
                    if (res.status === 200) {
                        setUser(prev => res.data)
                    }
                    else
                        console.log(res.data)
                }
            }).catch(e => console.log(e))
    }, [token, navigate])

    useEffect(() => {
        profileRef.current.onerror = () => {
            profileRef.current.src = default_profile
        }

    }, [])

    return (
        <>
            <main>
                <div className="w-full dashboard">
                    <nav className="grass-box">
                        <section>
                            <div>
                                <NavLink to="/">home</NavLink>
                            </div>
                            <div>
                                <NavLink to="/dashboard/">Blogs</NavLink>
                            </div>
                            <div>
                                <NavLink to="/dashboard/user">users</NavLink>
                            </div>
                            <div>
                                <NavLink to="/dashboard/messages">Messages</NavLink>
                            </div>
                            <div className="me">
                                <NavLink to="/dashboard/profile">
                                    <div className="icon">
                                        <img ref={profileRef} src={user?.profile || 'undefined'} alt={user?.username}></img>
                                    </div>
                                    <span>profile</span>
                                </NavLink>
                            </div>
                        </section>
                    </nav>
                    <div className="grass-box">
                        <Routes>
                            <Route path="/" element={<DashBlogs />}></Route>
                            {/* <Route path="/blogs" action={navigate('/dashboard/')}></Route> */}
                            <Route path="/messages" element={<DashMessages />}></Route>
                            <Route path="/blogs/add" element={<AddBlog user={user} />}></Route>
                            <Route path="*" element={
                                <div>
                                    <h2>404</h2>
                                </div>
                            }></Route>
                        </Routes>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Dashboard;