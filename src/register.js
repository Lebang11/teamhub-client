import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


//Testing:

// const registerURL =`http://localhost:3000/api/create`

const registerURL = `https://team-hub.onrender.com/api/create`

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("Submit");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  
  
        await axios.post(registerURL, {
        username,
        email,
        password,
        passwordConfirm
        })
        .then(response => {
            setError("")
            setToken(response.data.token)
            setMessage('Submit')
            })
        .catch((err) => {
            console.log(err)
            setMessage('Submit')
            setPassword('')
            setPasswordConfirm('')
            setError(err.response.data.message)})
            setToken('')
    }
    

    function handleMessage() {
        setMessage('Loading...')
    }
    
    
    
    return (
        <div className="register">
        <Link to="https://team-hub.netlify.app">
        <button className="submit-button back-button">Back</button>
        </Link>
        
        <div className="form-box-flex">
            <form onSubmit={handleSubmit} className="form-box">
                <h1>Sign In</h1>
                <input 
                onChange={(e) => setUsername(e.target.value)} value={username}
                type="text" placeholder="Username" className="email-text-box js-email"
                name="username"/>
                <input 
                onChange={(e) => setEmail(e.target.value)} value={email}
                type="text" placeholder="Email" className="email-text-box js-email"
                name="email"/>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password} type="password" placeholder="Password" className="password-box" name="password"/>
                <input 
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm} type="password" placeholder="Confirm Password" className="password-box" name="passwordConfirm"/>
                <button onClick={handleMessage} type="submit" className="submit-button js-submit-button">{message}</button>
                <p className="error-message">{error}</p>
                <p>{token}</p>
            </form>     
        </div>
    </div>   
    );
}
 
export default Register;