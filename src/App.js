import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpenPage from './opening';
import Register from './register';
import Login from './login';
import MainPage from './main';
import { Component } from 'react';
import Problems from './problems';
import ProblemPage from './problem-page';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


class App extends Component {
  render() {

    const firebaseConfig = {
      apiKey: "AIzaSyDAjLzlQ75TvWKUcc2TG37muEg9SZJVZV8",
      authDomain: "team-hub-18735.firebaseapp.com",
      projectId: "team-hub-18735",
      storageBucket: "team-hub-18735.appspot.com",
      messagingSenderId: "795963822854",
      appId: "1:795963822854:web:99c767d5fd05dc3d024487",
      measurementId: "G-6GMR573WMH"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);


  return (
      <Router>
        <Routes>
          <Route path='/blogs' element={<showBlogs/>}/>
          <Route exact path='/' element={<OpenPage/>}/>
          <Route path='/create' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/main' element={<MainPage />}/>     
          <Route path='/problems' element={<ProblemPage/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
