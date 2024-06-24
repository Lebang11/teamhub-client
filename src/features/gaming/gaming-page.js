import { useState } from "react";
import NewGamingProfile from "./new-gaming";
import Gamers from "./gamers";


const GamingPage = (props) => {
    const [addProfile, setAddProfile] = useState(false)

    return ( 
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <h2 className="display-4">Gaming</h2>
                <button onClick={()=>{
                    if (addProfile===false) {
                        setAddProfile(true)}
                    else {
                        setAddProfile(false)
                    }
                }} className="btn btn-outline-warning">
                    Add Gaming Profile
                </button>      
                <div className="w-75 d-flex flex-column container-lg justify-content-center align-items-cente">
                    <div className="d-flex justify-content-center align-items-center flex-column w-100">
                        {addProfile && 
                        <NewGamingProfile/>
                        }
                    </div>
                    <div className="mt-4">
                        <Gamers theme={props.theme}/>
                    </div>
                    
                </div>
        </div>
    );
}
 
export default GamingPage;