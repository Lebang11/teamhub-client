import { useState } from "react";
import NewChallenge from "./new-challenge";
import Challenges from "./challenges";

const ChallengesPage = () => {
    const [addChallenge, setAddChallenge] = useState(false)

    return ( 
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <h2 className="display-4">Challenges</h2>
                <button onClick={()=>{
                    if (addChallenge===false) {
                        setAddChallenge(true)}
                    else {
                        setAddChallenge(false)
                    }
                }} className="btn btn-outline-warning">
                    Add Challenge
                </button>      
                <div className="w-75 d-flex flex-column container-lg justify-content-center align-items-cente">
                    <div >
                        {addChallenge && 
                        <NewChallenge/>
                        }
                    </div>
                    <div className="mt-4">
                    {!addChallenge && <Challenges/>}

                    </div>
                    
                </div>
        </div>
    );
}
 
export default ChallengesPage;