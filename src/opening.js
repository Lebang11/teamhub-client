import './App.css';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

function OpenPage() {
  return (
      

        <div class="opening-div w-100">
          <div class="p-2 w-100">
              <Link className='w-100 d-flex justify-content-center text-decoration-none' to='/create'>
                <button className='add-myself-button btn btn-lg btn-dark w-75'  >Add myself to team</button>
              </Link>
          </div>
          <div class="p-2 w-100">
              <Link className='w-100 d-flex justify-content-center text-decoration-none' to='/login'>
                <button className='add-myself-button btn btn-lg btn-dark w-75'  >Login</button>
              </Link>
          </div>
        </div>
     
  
  );
}

export default OpenPage;
