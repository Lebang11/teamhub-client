import { useState } from "react";
import ShowProblems from "./problems";
import NewProblem from "./new-problem";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "./navbar";
import axios from "axios";

const ProblemPage = () => {
    const [problemsShown, setProblemsShown] = useState(false);
    const [showAll, setShowAll] = useState(true);

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
            setShowAll(false)
            
        } else {
            setProblemsShown(false)
            setShowAll(true)
        }
    }

    


    return ( 
        <div>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <h3 className="display-4">Issues</h3>
            <div className="w-75 m-4 mt-1">
                <button className="btn btn-outline-secondary" onClick={showNewProblem}>post problem</button>
            </div>
            <div className="blogs-box w-75">
                {problemsShown && <NewProblem/>}
                
            </div>
            <div className="w-75">
                
                {showAll && <ShowProblems/>}
            </div>
            </div>
        </div>
    );
}
 
export default ProblemPage;