import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation()

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
                    }
                </ul>
                <script type="module" defer src="/js/munubar.js"></script>
            </header>
        </>
    );
}

export default Header;