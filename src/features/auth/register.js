import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user";


//Testing:

// const registerURL =`http://localhost:3000/api/create`

const registerURL = `https://team-hub.onrender.com/api/create`

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("Submit");
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [colour, setColour] = useState('dark')
    

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  
        setLoading(true)
        await axios.post(registerURL, {
        username,
        email,
        password,
        passwordConfirm
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
            console.log(err)
            setLoading(false)
            setPassword('')
            setPasswordConfirm('')
            setError(err.response.data.message)})
            setToken('')
    }
    
    
    return (
        <div className="form-box-flex w-100 h-100">
            <form onSubmit={handleSubmit} className="form-box">
                <h1 className="display-6 ">Sign up</h1>
                <div class="form-group w-75">
                <input type="text" class="form-control form-control-light" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} name="username"/>
                </div>
                <div class="form-group w-75">
                <input type="email" class="form-control form-control-light" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} name="email"/>
                </div>
                <div class="form-group w-75">
                    <input type="password" class="form-control form-control-light" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} name="password"/>
                </div>
                <div class="form-group w-75">
                    <input type="password" class="form-control form-control-light" placeholder="Confirm password" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} name="passwordConfirm"/>
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
            </form> 
        </div>
    
    );
}
 
export default Register;