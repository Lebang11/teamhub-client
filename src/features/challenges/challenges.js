import { useEffect, useState } from "react";
import Challenge from "./challenge";

const Challenges = (props) => {
    const [challenges, setChallenges] = useState([]);
    const [refresh, setRefresh] = useState('refresh');


    const getChallenges = async () => {
        fetch('https://teamhub-server-tau.vercel.app/api/challenges')
        .then(res => res.json())
        .then(response => {
            setChallenges(response);
            console.log(challenges)
        })    
    }

    useEffect(() => {
        getChallenges()  
    },[])

    function refreshBlogs() {
        setRefresh('Refreshing...')
        getChallenges();
        
    }

    if (props.profile) {
        return ( 
            <div>
                            <button onClick={refreshBlogs} className="btn btn-outline-info mb-2">{refresh}</button>

                {
                    challenges.map((challenge) => {
                        if (challenge.authorID === props.id) {
                        return (
                            <div>                            

                                <div className="container-lg blog-box w-100 border border-bottom rounded-left my-2">
                                
                                <Challenge challenge={challenge}/>
                                </div>
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
             <button onClick={refreshBlogs} className="btn btn-outline-info mb-2">{refresh}</button>

            {
                challenges.map((challenge) => {
                    return (
                        <div>                            
                            <div className="container-lg blog-box w-100 border border-bottom rounded-left my-2">
                            
                            <Challenge challenge={challenge}/>
                        </div>
                        </div>
                        
                    )
                })
            }
        </div>
    );}
}
 
export default Challenges;