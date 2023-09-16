import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function OpenPage() {
  return (
      <div className="App">
      <div class="opening-div">
            <div class="add-myself-div">
                <a href="/create">
                    <button class="add-myself-button">Add myself to the team</button>
                </a> 
            </div>
            <div class="add-myself-div">
                <a href="/login">
                    <button class="add-myself-button">Login</button>
                </a> 
            </div>
        </div>
      </div>
  );
}

export default OpenPage;
