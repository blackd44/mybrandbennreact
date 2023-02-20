import axios from "axios";
import { useCallback, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../components/context/userContext";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const server = process.env.REACT_APP_SERVER_URL

const Login = () => {
    const navigate = useNavigate()

    const formRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const submitRef = useRef()
    const infoRef = useRef()

    const { setUser} = useContext(UserContext)

    const submit = useCallback((e) => {
        submitRef.current.disabled = true
        e.preventDefault()
        let user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        console.log(user)

        axios
            .post(server + '/api/users/login', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status !== 204) {
                    if (res.status === 200) {
                        Cookie.set('token', res.data.token, { expires: 7 })
                        axios
                            .get(server + '/api/users/user', {
                                headers: {
                                    Authorization: 'Bearer ' + res.data.token
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
                        navigate('/')
                    }
                    else
                        console.log(res)
                }
            }).catch(e => {
                let res = e.response
                if (res.status === 400)
                    infoRef.current.innerText = res.data?.error?.message
                if (res.status === 401)
                    infoRef.current.innerText = res.data?.info?.message
            })

        submitRef.current.disabled = false
    }, [setUser, navigate])

    useEffect(() => {
        let form = formRef.current
        if (!form || form === null)
            return

        form.addEventListener('submit', submit)

        return () => {
            form.removeEventListener('submit', submit)
        }
    }, [submit])

    return (
        <>
            <main>
                <section className="first">
                    <div className="grass-box sign">
                        <h2 className="h">Welcome</h2>
                        <form className="form1" name="signin" ref={formRef}>
                            <label className="input">
                                <input type="text" name="email" placeholder="Email" ref={emailRef} />
                            </label>
                            <label className="input">
                                <input type="password" name="password" placeholder="Password" ref={passwordRef} />
                            </label>
                            <label>
                                <label className="checkbox1">
                                    <input type="checkbox" name="remember" />
                                    <div className="checkmark"></div>
                                </label>
                                <span>remember me</span>
                            </label>
                            <button type="submit" ref={submitRef}>Log in</button>
                            <p>Forgot Password?</p>
                            <p id="info" style={{ color: '#f00' }} ref={infoRef}></p>
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