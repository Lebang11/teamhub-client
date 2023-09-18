import { Link } from "react-router-dom";

const Login = () => {
    
    return (
        <div className="register">
        <Link to="https://roaring-florentine-6468ec.netlify.app">
        <button class="submit-button back-button">Back</button>
        </Link>
        
        <div class="form-box-flex">
            <form  method="POST" class="form-box">
                <h1>Sign In</h1>
                <input name="email" type="text" placeholder="Email" class="email-text-box js-email"/>
                <input name="password" type="password" placeholder="Password" class="password-box"/>
                <button type="submit" class="submit-button js-submit-button">Submit</button>
            </form>     
        </div>
    </div>
            
        
    );
}
 
export default Login;