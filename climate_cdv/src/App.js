import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import View1 from './pages/View1';
import View2 from './pages/View2';
import Custom from './pages/Custom';

export function App() {
  return (
    <>
      <Navbar />
      {/* <div className="container1">
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/login" element = {<Login/>}/>
        </Routes>
      </div> */}
      <div className="container2">
        <Routes>
          <Route path = "/view1" element = {<View1/>} />
          <Route path = "/view2" element = {<View2/>} />
          <Route path = "/custom" element = {<Custom/>} />
        </Routes>
      </div>
    </>
  );
}