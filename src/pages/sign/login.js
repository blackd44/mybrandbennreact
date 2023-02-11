import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const formRef = useRef()

    useEffect(() => {
        let form = formRef.current
        if (!form || form === null)
            return

        form.addEventListener('submit', submit)

        return () => {
            form.removeEventListener('submit', submit)
        }
    }, [])

    const submit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    return (
        <>
            <main>
                <section className="first">
                    <div className="grass-box sign">
                        <h2 className="h">Welcome</h2>
                        <form className="form1" name="signin" ref={formRef}>
                            <label className="input">
                                <input type="text" name="email" placeholder="Email" />
                            </label>
                            <label className="input">
                                <input type="password" name="password" placeholder="Password" />
                            </label>
                            <label>
                                <label className="checkbox1">
                                    <input type="checkbox" name="remember" />
                                    <div className="checkmark"></div>
                                </label>
                                <span>remember me</span>
                            </label>
                            <button type="submit">Log in</button>
                            <p>Forgot Password?</p>
                            <p id="info" style={{ color: '#f00' }}></p>
                        </form>
                        <p style={{ margin: 'revert' }}>don’t have an account? Click <Link className="active-color"
                            to="/signup">here</Link></p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;