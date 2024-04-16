import './App.css';
import { BrowserRouter as Router, Route, Routes,Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom";


function ResetPage() {
    const {id} = useParams();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [error, setError] = useState('')

    const navigate = useNavigate();

    const updatePassword = async () => {
        if (password.length <5) {
            setError('Password too short (5 letters or more).')
        } else if (password !== passwordConfirm) {
            setError('Passwords do not match')
        } else {
            await axios.post(`https://team-hub.onrender.com/api/user`, 
            {
                id,
                password
            })
            .then(res => {
                alert('Password has been reset :)')
                console.log(res)
                navigate('/login')    
            })
            .catch(err => console.log(err))
        }
        
    }


  return (
        <div class="opening-div w-100">
            <form className='border p-4 rounded '>
              <h3>Reset Password</h3>
              <div className='mb-3'>
                <label for='password' className='form-label'>New Password</label>
                <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
              </div>
              <div className='mb-3'>
                <label for='password' className='form-label'>Confirm Password</label>
                <input className='form-control' type='password' onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm}></input>
                <small className='text-danger'>{error}</small>
              </div>
              <button type="button" class="btn btn-primary" onClick={updatePassword}>Submit</button>
            </form>
        </div>
     
  
  );
}

export default ResetPage;
