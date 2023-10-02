import { useState } from "react";
import ShowProblems from "./problems";
import NewProblem from "./new-problem";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const ProblemPage = () => {
    const [problemsShown, setProblemsShown] = useState(false);

    if (!Cookies.get(`token_name`) || !Cookies.get(`token_email`)){
        return (
            <div>
                <h1>Please Login</h1>
                <Link to='/login'>
                    <h4>Login</h4>
                </Link> 
            </div>  
        )
    } 

    const showNewProblem = () => {
        if (problemsShown === false) {
            setProblemsShown(true)
        } else {
            setProblemsShown(false)
        }
    }


    return ( 
        <div>
            <div className="main-header">
                <h1>
                    Welcome to Team-Hub
                </h1>
            </div>
            <div className="blogs-box">
            <div className="back-button-div">
                <Link to="/main">
                    <button className="submit-button back-button">Back</button>
                </Link>
            
            </div>
                <h2>Problems</h2>
                <button className="blogs-button" onClick={showNewProblem}>post problem</button>
            <div>
                {problemsShown && <NewProblem/>}
            </div>
            <div>
                
                {<ShowProblems/>}
            </div>
            </div>
        </div>
    );
}
 
export default ProblemPage;