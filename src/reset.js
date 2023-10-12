import './App.css';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function ResetPage() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [error, setError] = useState('')


    const sendEmail = async () => {

    
        await axios.post(`https://team-hub.onrender.com/api/email`,
        {
            password
        }
        )
        .then(res => {
            console.log(res)
            console.log('Email sent')
        })
        .catch(err => console.log(err))

    // const updatePassword = async () => {
    //     await axios.post(`https://team-hub.onrender.com/api/user`, 
    //     {
    //         _id,
    //         password
    //     })
    // }



  
  }


  return (
        <div class="opening-div w-100">
            <form className='border p-4 rounded '>
              <h3>Reset Password</h3>
              <div className='mb-3'>
                <label for='password' className='form-label'>New Password</label>
                <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
                {/* <div id="emailHelp" class="form-text">We'll send a link to reset password to this email.</div> */}
                <small className='text-danger'>{error}</small>
              </div>
              <div className='mb-3'>
                <label for='password' className='form-label'>Confirm Password</label>
                <input className='form-control' type='password' onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm}></input>
                {/* <div id="emailHelp" class="form-text">We'll send a link to reset password to this email.</div> */}
                <small className='text-danger'>{error}</small>
              </div>

              <button type="button" class="btn btn-primary" >Submit</button>
            </form>
        </div>
     
  
  );
}

export default ResetPage;
