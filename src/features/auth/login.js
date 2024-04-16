import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user";


//Testing:

// const loginURL =`http://localhost:3000/api/login`

const loginURL = `https://team-hub.onrender.com/api/login`

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Submit");
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [colour, setColour] = useState('dark')
    
    const dispatch = useDispatch() 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        setLoading(true)
  
        await axios.post(loginURL, {
        email,
        password,
        })
        .then(response => {
            Cookies.set('token_id', response.data.token_id , { expires: 7 });
            Cookies.set('token_name', response.data.token_name , { expires: 7 });
            Cookies.set('token_email', response.data.token_email , { expires: 7 });
            setToken(Cookies.get('token_name'))
            setLoading(false)
            setError("")
            dispatch(login(true))
            navigate('/blogs')
            })
        .catch((err) => {
            setLoading(false)
            setError(err.response.data.message)
            setToken('')
            setPassword('')
        })
    }
    

    function handleMessage() {
        setMessage('Loading...')
    }
    
    
    
    return (
        <div className="form-box-flex w-100 h-100">
            
            <form onSubmit={handleSubmit} className="form-box">
                <h1 className="display-6 ">Sign in</h1>
                <div class="form-group w-75">
                <input type="email" class="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} name="email"/>
                </div>
                <div class="form-group w-75">
                    <input type="password" class="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} name="password"/>
                </div>
                
                {!isLoading &&  <button type="submit" class={`btn text-${colour} submit-button`}>{message}</button>}
                {isLoading && 
                <button class="btn btn-secondary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
                </button>
                }
                <p className="error-message">{error}</p>
                <p>{token}</p>
                <Link to="/forgot">
                    Forgot Password
                </Link>
            </form>
             
        </div>
    );
}
 
export default Login;