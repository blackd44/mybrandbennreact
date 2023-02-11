import { NavLink } from "react-router-dom";

const Header = () => {
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
                    <NavLink to="/portfolio.html">
                        <li>Portfolio</li>
                    </NavLink>
                    <NavLink to="/blogs/">
                        <li>Blogs</li>
                    </NavLink>
                    <NavLink to="/about">
                        <li>About</li>
                    </NavLink>
                    <NavLink to="/contact.html">
                        <li>Contact</li>
                    </NavLink>
                    <NavLink to="/signin.html">
                        <li>Sign in</li>
                    </NavLink>
                </ul>
                <script type="module" defer src="/js/munubar.js"></script>
            </header>
        </>
    );
}

export default Header;