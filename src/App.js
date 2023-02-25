import { Route, Routes } from 'react-router-dom';
import './App.css';
import {UserContext} from './components/context/userContext';
import Home from './pages/home.js';
import Layout from './components/layout';
import About from './pages/about';
import Portfolio from './pages/portfolio'
import Blogs from './pages/blogs/blogs';
import OneBlog from './pages/blogs/oneblog';
import Contact from './pages/contact';
import Login from './pages/sign/login';
import Signup from './pages/sign/signup';
import Dashboard from './pages/dashboard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const server = process.env.REACT_APP_SERVER_URL

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(Cookie.get('token'))

  useEffect(() => {
    if (!token || token === null)
      return
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
  }, [token, setUser])

  return (
    <>
      <UserContext.Provider value={{user, setUser, token, setToken}}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/portfolio' element={<Portfolio />}></Route>
            <Route path='/blogs' element={<Blogs />}></Route>
            <Route path='/blogs/:id' element={<OneBlog />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Route>
          <Route path='/dashboard/*' element={<Dashboard />}></Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
