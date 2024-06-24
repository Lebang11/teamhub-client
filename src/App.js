import './style/App.css';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import OpenPage from './opening';
import Register from './features/auth/register';
import Login from './features/auth/login';
import MainPage from './main';
import { Component, useEffect, useState } from 'react';
import ProblemPage from './features/problems/problem-page';
import ProblemDetails from './features/problems/problem-details';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ProfilePage from './profile-page';
import ForgotPage from './features/auth/forgot';
import ResetPage from './features/auth/reset';
import BlogPage from './features/blogs/blog-page';
import ChallengesPage from './features/challenges/challenges-page';
import GamingPage from './features/gaming/gaming-page'
import NavBar from './navbar';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/user';
import NotUser from './features/auth/not-user';
import { selectTheme } from './redux/theme';
import ChallengeDetails from './features/challenges/challenge-details';
import NewsPage from './features/news/news-page';

const App = () => {
    

    const dispatch = useDispatch()
    let user = useSelector((state) => {return state.user.value});
    let theme = useSelector((state) => {return state.theme.value});
    
    document.documentElement.setAttribute('data-bs-theme', theme)

    if (!Cookies.get(`token_name`) || !Cookies.get(`token_email`) || !Cookies.get(`token_id`)){
      dispatch(login(false))
    } else if (Cookies.get(`token_name`) && Cookies.get(`token_email`) && Cookies.get(`token_id`)) {
      dispatch(login(true))
    }



    if (user) {
      return (
        
          <Router >
          
          <NavBar theme={theme}/>
          
          <Routes>
          <Route path='/news' element={<NewsPage theme={theme}/>}/>

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
            <Route path='/gaming' element={<GamingPage theme={theme}/>}/>
          </Routes>
          
        </Router>
              );
    } else {
      return (
        
        <Router>
          <NavBar theme={theme}/>
          <Routes>
          <Route path='/news' element={<NewsPage theme={theme}/>}/>

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
            <Route path='/gaming' element={<GamingPage theme={theme}/>}/>
          
          </Routes>
         
        </Router>
      )
    }
    
    
  }


export default App;
