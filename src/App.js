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


class App extends Component {
  render() {

  return (
      <Router>
        <Routes>
          <Route path='/blogs' element={<showBlogs/>}/>
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
  }
}

export default App;
