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

const App = () => {
    const [themeChanged, setTheme] = useState('')
    const [checked, setCheck] = useState(false)
    const [footerColour, setFooterColour] = useState('light')

    const dispatch = useDispatch()
    let user = useSelector((state) => {return state.user.value});

    let theme = window.localStorage.getItem('theme') || 'light';
    
    
    

    useEffect(() => {
        if (theme == 'dark') {
          setCheck(true)
        } else {
          setCheck(false)
        }
        document.documentElement.setAttribute('data-bs-theme', theme)
        if (theme === 'light') {
          setFooterColour('light')
          document.getElementById("footer").classList.add("bg-light")
          document.getElementById("footer").classList.remove("bg-secondary")

        } else {
          document.getElementById("footer").classList.add("bg-secondary")
          document.getElementById("footer").classList.remove("bg-light")


          setFooterColour('secondary')
        }
      }, [themeChanged])

    const changeTheme = () => {
      if (window.localStorage.getItem('theme') == 'dark') {
        window.localStorage.setItem('theme', 'light')
        document.documentElement.setAttribute('data-bs-theme', 'light')
        setTheme('light')
      } else {
        window.localStorage.setItem('theme', 'dark')
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        setTheme('dark')

      }
  }

    if (!Cookies.get(`token_name`) || !Cookies.get(`token_email`) || !Cookies.get(`token_id`)){
      dispatch(login(false))
    } else if (Cookies.get(`token_name`) && Cookies.get(`token_email`) && Cookies.get(`token_id`)) {
      dispatch(login(true))
    }


    if (user) {
      return (
        <div className='mb-5'>
          <Router >
          <NavBar/>
          <div className="form-check form-switch" onClick={changeTheme}>
                {<input checked={checked} id="theme-switch" className="form-check-input" type="checkbox"></input>}
                <label for="theme-switch" >Dark mode</label>
            </div>
  
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

        </div>
              );
    } else {
      return (
        <Router>
          <NavBar/>
          <div className="form-check form-switch" onClick={changeTheme}>
                <input id="theme-switch" className="form-check-input" type="checkbox"></input>
                <label for="theme-switch" >Dark mode</label>
            </div>

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
