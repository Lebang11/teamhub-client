import './App.css';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import OpenPage from './opening';
import Register from './register';
import Login from './login';
import MainPage from './main';
import { Component, useEffect, useState } from 'react';
import Problems from './problems';
import ProblemPage from './problem-page';
import ProblemDetails from './problem-details';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ProfilePage from './profile-page';
import ForgotPage from './forgot';
import ResetPage from './reset';
import BlogPage from './blog-page';
import ChallengesPage from './challenges-page';
import NavBar from './navbar';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './user';
import NotUser from './not-user';
import theme, { selectTheme } from './theme';
import { change } from './theme';
import ChallengeDetails from './challenge-details';
import ParticlesComponent from './utilities/particles';
import ParticlesComponent2 from './utilities/particles2';


const App = () => {
    

    const dispatch = useDispatch()
    let user = useSelector((state) => {return state.user.value});

    ;
    


    

    if (!Cookies.get(`token_name`) || !Cookies.get(`token_email`) || !Cookies.get(`token_id`)){
      dispatch(login(false))
    } else if (Cookies.get(`token_name`) && Cookies.get(`token_email`) && Cookies.get(`token_id`)) {
      dispatch(login(true))
    }


    if (user) {
      return (
        
          <Router >
          
          <NavBar/>
          
          <Routes>
            <Route path='/blogs' element={<BlogPage theme={theme}/>}/>
            <Route exact path='/' element={<OpenPage theme={theme}/>}/>
            <Route path='/create' element={<Register theme={theme}/>}/>
            <Route path='/login' element={<Login theme={theme}/>}/>
            <Route path='/main' element={<MainPage theme={theme}/>}/>     
            <Route exact path='/problems' element={<ProblemPage theme={theme}/>}/>
            <Route path='/problems/:id' element={<ProblemDetails theme={theme}/>}/>
            <Route path='/user/:id' element={<ProfilePage theme={theme}/>}/>
            <Route path='/forgot' element={<ForgotPage theme={theme}/>}/>
            <Route path='/reset/:id' element={<ResetPage theme={theme}/>}/>
            <Route path='/challenges' element={<ChallengesPage theme={theme}/>}/>
            <Route path='/challenge/:id' element={<ChallengeDetails theme={theme}/>}/>
          </Routes>
          
        </Router>
              );
    } else {
      return (
        
        <Router>
          <NavBar/>
          <Routes>
            <Route exact path='/' theme={theme} element={<OpenPage/>}/>
            <Route path='/create' theme={theme} element={<Register/>}/>
            <Route path='/login' theme={theme} element={<Login/>}/>
            <Route path='/forgot' theme={theme} element={<ForgotPage/>}/>
            <Route path='/reset/:id' theme={theme} element={<ResetPage/>}/>
            <Route path='/blogs' theme={theme} element={<NotUser/>}/>
            <Route path='/main' theme={theme} element={<NotUser/>}/>     
            <Route exact path='/problems' theme={theme} element={<NotUser/>}/>
            <Route path='/problems/:id' theme={theme} element={<NotUser/>}/>
            <Route path='/user/:id' theme={theme} element={<NotUser/>}/>
            <Route path='/challenges' element={<NotUser theme={theme}/>}/>
            <Route path='/challenge/:id' element={<NotUser theme={theme}/>}/>
          </Routes>
        </Router>
      )
    }
    
    
  }


export default App;
