import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

//Testing:

// const loginURL =`http://localhost:3000/api/login`

const loginURL = `https://team-hub.onrender.com/api/login`

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Submit");
    

    const handleSubmit = async (e) => {
        const data = []
        e.preventDefault();
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  
  
        await axios.post(loginURL, {
        email,
        password,
        }).then(response => data.push(response.data)).catch((err) => console.log(err))
        
        console.log(data);
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
                
            </form>     
        </div>
    </div>   
    );
}
 
export default Login;