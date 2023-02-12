import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home.js';
import Layout from './components/layout';
import About from './pages/about';
import Portfolio from './pages/portfolio'
import Blogs from './pages/blogs/blogs';
import OneBlog from './pages/blogs/oneblog';
import Contact from './pages/contact';
import Login from './pages/sign/login';
import Signup from './pages/sign/signup';

function App() {
  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
