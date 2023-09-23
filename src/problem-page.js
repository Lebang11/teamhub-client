import { useState } from "react";
import ShowProblems from "./problems";
import NewProblem from "./new-problem";
import { Link } from "react-router-dom";

const ProblemPage = () => {
    const [problemsShown, setProblemsShown] = useState(false);

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
            <div className="problems">
            <div className="back-button-div">
                <Link to="/main">
                    <button className="submit-button back-button">Back</button>
                </Link>
            </div>
            </div>
            <button className="blogs-button" onClick={showNewProblem}>post problem</button>
            <div>
                {problemsShown && <NewProblem/>}
            </div>
            <div>
                <h2>Problems</h2>
                {<ShowProblems/>}
            </div>
            
        </div>
    );
}
 
export default ProblemPage;