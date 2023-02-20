import { Link, NavLink, useLocation } from "react-router-dom";
import Cookie from "js-cookie";
import { useCallback, useContext, useEffect, useRef} from "react";
import { UserContext } from "./context/userContext";

const Header = () => {
    const location = useLocation()

    const {user, setUser, setToken} = useContext(UserContext)

    let signout = useRef()

    const logout = useCallback(function (e) {
        Cookie.set('token', undefined, { expires: -1 })
        setUser(null)
        setToken(undefined)
        console.log(e)
    }, [setUser, setToken])

    useEffect(() => {
        let sign = signout.current
        if (sign && sign !== null) {
            sign.addEventListener('click', logout)
        }

        return () => {
            if (sign && sign !== null) {
                sign.removeEventListener('click', logout)
            }
        }
    }, [logout, user])

    // useEffect(() => {
    //     console.log(user)
    // }, [user])
    return (
        <>
            <header>
                <div className="menu">
                    <div className="menubar"></div>
                </div>
                <ul id="head">
                    <div className="back"></div>
                    <NavLink to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/portfolio">
                        <li>Portfolio</li>
                    </NavLink>
                    <NavLink to="/blogs/">
                        <li>Blogs</li>
                    </NavLink>
                    <NavLink to="/about">
                        <li>About</li>
                    </NavLink>
                    <NavLink to="/contact">
                        <li>Contact</li>
                    </NavLink>
                    {
                        user !== null ? (
                            <div>
                                <li className="profile">
                                    <div className="profile">
                                        <img alt={user.username} src={user.profile} />
                                    </div>
                                </li>
                                <div className="submenu">
                                    <article>
                                        <Link to="/dashboard/profile">profile</Link>
                                        <Link to="/dashboard/">dashboard</Link>
                                        <Link to="/dashboard/blogs/add">add blog</Link>
                                    </article>
                                    <article>
                                        <Link ref={signout} to='/' style={{ color: 'rgb(255, 0, 0)' }}>signout</Link>
                                    </article>
                                </div>
                            </div>
                        ) : (
                            location.pathname !== '/login'
                                ? (
                                    <NavLink to="/login">
                                        <li>login</li>
                                    </NavLink>
                                )
                                : (
                                    <NavLink to="/signup">
                                        <li>signup</li>
                                    </NavLink>
                                )
                        )
                    }
                </ul>
                <script type="module" defer src="/js/munubar.js"></script>
            </header>
        </>
    );
}

export default Header;