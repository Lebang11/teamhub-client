import { useEffect, useState } from "react";
import Gamer from "./gamer";

const Gamers = (props) => {
    const [gamers, setGamers] = useState([]);
    const [refresh, setRefresh] = useState('refresh');


    const getGamers = async () => {
        fetch('https://teamhub-server-tau.vercel.app/api/gamers')
        .then(res => res.json())
        .then(response => {
            setGamers(response);
            setRefresh('refresh');
        })    
    }

    useEffect(() => {
        getGamers()  
    },[])

    function refreshBlogs() {
        setRefresh('refreshing...')
        getGamers();
    }

    return ( 
        <div>
            <button onClick={refreshBlogs} className="btn btn-outline-info mb-2">{refresh}</button>

            {
                gamers.map((gamer) => {
                    return (
                        <div className="my-3">                            

                            <div className="container-lg blog-box w-100 border border-bottom rounded-left my-0">
                            
                            <Gamer theme ={props.theme} gamer={gamer} />
                        </div>
                        </div>
                        
                    )
                })
            }
        </div>
    );}

 
export default Gamers;