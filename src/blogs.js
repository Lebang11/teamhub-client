
// import { useState } from "react";
// import { Link } from "react-router-dom";
import React from "react";
// import App from "./App";
import { useEffect, useState } from "react";

const ShowBlogs = (props) => {
    const [dbBlogs, setDbBlogs] = useState([]);
    const [refresh, setRefresh] = useState('refresh')
    

    const getBlogs =  async () => {
        
        await fetch('https://team-hub.onrender.com/api/blogs')
        .then(response => response.json())
        .then(res => {
            setDbBlogs(res)
            setRefresh('refresh');
            console.log(res)
        }
            )
        .catch(err => console.log(err));

        
        }

    useEffect(()=> {
        try {
            getBlogs();
        } catch(err) {
            console.log(err);
        }
        
    }, [])

    function refreshBlogs() {
        setRefresh('Refreshing...')
        getBlogs();
        
    }

    return(
        <div>
            <button onClick={refreshBlogs} className="refresh-button">{refresh}</button>
            <div>
            {
            dbBlogs.map((blo) => {
                console.log(blo)
                return (
                    <div>
                        <div className="blog-box">
                            <h2 className="author">
                                {blo.title}
                            </h2>
                            <div>{blo.text}</div>
                            <h3>Written by {blo.author}</h3>
                            
                        </div> 
                        
                    </div>
                )
            }) }   
            </div>
        </div>
       )
}
 
export default ShowBlogs;

