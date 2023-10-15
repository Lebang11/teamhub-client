import './App.css';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import OpenPage from './opening';
import Register from './register';
import Login from './login';
import MainPage from './main';
import { Component } from 'react';
import Problems from './problems';
import ProblemPage from './problem-page';
import ProblemDetails from './problem-details';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ProfilePage from './profile-page';
import ForgotPage from './forgot';
import ResetPage from './reset';
import BlogPage from './blog-page';
import NavBar from './navbar';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './user';
import NotUser from './not-user';

const App = () => {
    const dispatch = useDispatch()
    let user = useSelector((state) => {return state.user.value})
    if (!Cookies.get(`token_name`) || !Cookies.get(`token_email`) || !Cookies.get(`token_id`)){
      dispatch(login(false))
    } else if (Cookies.get(`token_name`) && Cookies.get(`token_email`) && Cookies.get(`token_id`)) {
      dispatch(login(true))
    }

    if (user) {
      return (
        <Router>
  
          <Routes>
            <Route path='/blogs' element={<BlogPage/>}/>
            <Route exact path='/' element={<OpenPage/>}/>
            <Route path='/create' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/main' element={<MainPage />}/>     
            <Route exact path='/problems' element={<ProblemPage/>}/>
            <Route path='/problems/:id' element={<ProblemDetails/>}/>
            <Route path='/user/:id' element={<ProfilePage/>}/>
            <Route path='/forgot' element={<ForgotPage/>}/>
            <Route path='/reset/:id' element={<ResetPage/>}/>
  
          </Routes>
        </Router>
      );
    } else {
      return (
        <Router>
          <Routes>
            <Route exact path='/' element={<OpenPage/>}/>
            <Route path='/create' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgot' element={<ForgotPage/>}/>
            <Route path='/reset/:id' element={<ResetPage/>}/>
            <Route path='/blogs' element={<NotUser/>}/>
            <Route path='/main' element={<NotUser/>}/>     
            <Route exact path='/problems' element={<NotUser/>}/>
            <Route path='/problems/:id' element={<NotUser/>}/>
            <Route path='/user/:id' element={<NotUser/>}/>
          </Routes>
        </Router>
      )
    }
    
    
  }


export default App;
