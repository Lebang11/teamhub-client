import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';

function OpenPage(props) {
  const [colour, setColour] = useState('dark')

  let theme = window.localStorage.getItem('theme');

  useEffect(() => {
    if (theme == 'dark') {
      setColour('secondary')
    } else {
      setColour('dark')
    }
  }, [props.theme])
  
  return (
      

        <div class="opening-div w-auto">
          <div class="p-2 w-100">
              <Link className='w-100 d-flex justify-content-center text-decoration-none' to='/create'>
                <button className={`add-myself-button btn btn-lg btn-${colour} w-75`}  >Add myself to team</button>
              </Link>
          </div>
          <div class="p-2 w-100">
              <Link className='w-100 d-flex justify-content-center text-decoration-none' to='/login'>
                <button className={`add-myself-button btn btn-lg btn-${colour} w-75`}  >Login</button>
              </Link>
          </div>
        </div>
     
  
  );
}

export default OpenPage;
