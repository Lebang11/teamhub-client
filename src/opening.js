import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
function OpenPage(props) {
  const [colour, setColour] = useState('dark');

  let theme = window.localStorage.getItem('theme');

  useEffect(() => {
    if (theme == 'dark') {
      setColour('secondary')
    } else {
      setColour('dark')
    }
  }, [props.theme])
  
  return (
      
        <div id='Landing' className='mt-1'>
          
          <h1 className='text-center display-3 fw-bold'>
            Welcome to Team-Hub
          </h1>
          <div class="opening-div mt-0 w-auto" >
          <div class="p-2 w-100">
              <Link className='w-100 d-flex justify-content-center text-decoration-none' to='/create'>
                <button className={`add-myself-button btn btn-lg btn-secondary w-75`}  >Add myself to team</button>
              </Link>
          </div>
          <div class="p-2 w-100">
              <Link className='w-100 d-flex justify-content-center text-decoration-none' to='/login'>
                <button className={`add-myself-button btn btn-lg btn-secondary w-75`}  >Login</button>
              </Link>
          </div>
        </div>
        </div>
        
     
  
  );
}

export default OpenPage;
