import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home.js';
import Layout from './components/layout';
import About from './pages/about';
import Portfolio from './pages/portfolio'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/portfolio' element={<Portfolio />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
