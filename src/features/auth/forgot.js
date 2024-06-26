import '../../style/App.css';
import axios from 'axios';
import { useState } from 'react';

function ForgotPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setLoading] = useState(false);



  const findUser = async () => {
    await fetch(`https://teamhub-server-tau.vercel.app/api/user?email=${email}`)
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
    setLoading(false);

}

  const sendEmail = async () => {

    
      await axios.post(`https://teamhub-server-tau.vercel.app/api/email`,
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
        <div className="opening-div w-100">
            {showForm && <form className='border p-4 rounded '>
              <h3>Forgot Password</h3>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email address</label>
                <input className='form-control' type='email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <div id="emailHelp" className="form-text">We'll send a link to reset password to this email.</div>
                <small className='text-danger'>{error}</small>

              </div>

              {/* <button type="button" className="btn btn-primary" onClick={() => {
                findUser()
                }}>Submit</button> */}

              {!isLoading &&  <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                setLoading(true);
                findUser();
              }}>Submit</button>}
                {isLoading && 
                <button className="btn btn-secondary" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
                </button>
                }
            </form>}
            {showMessage && <div>
              <h1 className='display-1'>Check Emails</h1>
              </div>}
        </div>
     
  
  );
}

export default ForgotPage;
