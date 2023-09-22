
// import { useState } from "react";
// import { Link } from "react-router-dom";
import React from "react";
// import App from "./App";
import { useEffect, useState } from "react";

const ShowBlogs = (props) => {
    const [dbBlogs, setDbBlogs] = useState([]);

    

    const getBlogs =  async () => {
        
        await fetch('https://team-hub.onrender.com/api/blogs')
        .then(response => response.json())
        .then(res => {
            setDbBlogs(res)
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

    return(
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
            }) || console.log('wait')}   
        </div>)
}
 
export default ShowBlogs;

