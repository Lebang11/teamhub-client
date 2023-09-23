import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpenPage from './opening';
import Register from './register';
import Login from './login';
import MainPage from './main';
import { Component } from 'react';


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
        </Routes>
      </Router>
    );
  }
}

export default App;
