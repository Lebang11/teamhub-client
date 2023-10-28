import { useEffect, useState } from "react";
import Challenge from "./challenge";

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);

    const getChallenges = async () => {
        fetch('https://team-hub.onrender.com/api/challenges')
        .then(res => res.json())
        .then(response => {
            setChallenges(response);
            console.log(challenges)
        })    
    }

    useEffect(() => {
        getChallenges()  
    },[])


    return ( 
        <div>
            {
                challenges.map((challenge) => {
                    return (
                        <div className="container-lg blog-box w-100 border border-bottom rounded-left">
                            <Challenge challenge={challenge}/>
                        </div>
                    )
                })
            }
        </div>
    );
}
 
export default Challenges;