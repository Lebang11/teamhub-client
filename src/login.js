import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


//Testing:

// const loginURL =`http://localhost:3000/api/login`

const loginURL = `https://team-hub.onrender.com/api/login`

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Submit");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  
  
        await axios.post(loginURL, {
        email,
        password,
        })
        .then(response => {
            setToken(response.data.token)
            console.log(token)
            
            })
        .catch((err) => {
            setMessage('Submit')
            setError(err.response.data.message)})
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
                onChange={(e) => setEmail(e.target.value)} value={email}
                type="text" placeholder="Email" className="email-text-box js-email"
                name="email"/>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password} type="password" placeholder="Password" className="password-box" name="password"/>
                <button onClick={handleMessage} type="submit" className="submit-button js-submit-button">{message}</button>
                <p className="error-message">{error}</p>
                <p>{token}</p>
            </form>     
        </div>
    </div>   
    );
}
 
export default Login;