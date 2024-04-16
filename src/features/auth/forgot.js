import './App.css';
import axios from 'axios';
import { useState } from 'react';

function ForgotPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(true);
  const [showMessage, setShowMessage] = useState(false);



  const findUser = async () => {
    await fetch(`https://team-hub.onrender.com/api/user?email=${email}`)
    .then(response => response.json())
    .then(res => {
        console.log(res)
        if (res.message) {
          setError(res.message)
        } else if (!res.message) {
          setError('')
          sendEmail()
        } 
    })
    
    .then(res => {
        })
    .catch(err => console.log(err)) 
}

  const sendEmail = async () => {

    
      await axios.post(`https://team-hub.onrender.com/api/email`,
      {
        email  
      }
      )
      .then(res => {
        console.log(res)
        alert(`Email successfully sent`)
        setShowForm(false)
        setShowMessage(true)
      })
      .catch(err => console.log(err))


      

  
  }


  return (
        <div class="opening-div w-100">
            {showForm && <form className='border p-4 rounded '>
              <h3>Forgot Password</h3>
              <div className='mb-3'>
                <label for='email' className='form-label'>Email address</label>
                <input className='form-control' type='email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <div id="emailHelp" class="form-text">We'll send a link to reset password to this email.</div>
                <small className='text-danger'>{error}</small>

              </div>

              <button type="button" class="btn btn-primary" onClick={() => {
                findUser()
                }}>Submit</button>
            </form>}
            {showMessage && <div>
              <h1 className='display-1'>Check Emails</h1>
              </div>}
        </div>
     
  
  );
}

export default ForgotPage;
