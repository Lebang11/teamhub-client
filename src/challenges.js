import { useEffect, useState } from "react";
import Challenge from "./challenge";

const Challenges = (props) => {
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

    if (props.profile) {
        return ( 
            <div>
                {
                    challenges.map((challenge) => {
                        if (challenge.authorID === props.id) {
                        return (
                            <div className="container-lg blog-box w-100 border border-bottom rounded-left my-0">
                                <Challenge challenge={challenge}/>
                            </div>
                        )
                    }})
                }
            </div>
        );
    }
    else {
    return ( 
        <div>
            {
                challenges.map((challenge) => {
                    return (
                        <div className="container-lg blog-box w-100 border border-bottom rounded-left my-0">
                            <Challenge challenge={challenge}/>
                        </div>
                    )
                })
            }
        </div>
    );}
}
 
export default Challenges;