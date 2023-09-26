
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
                const date = new Date(blo.date)
                const day = date.getDate()
                const month = date.toLocaleString('default', {month: 'short'})
                const year = date.getFullYear()
                const timehours = date.getHours()
                const timemin = date.getMinutes()
                const timesec = date.getSeconds()
                const fulltime = `${timehours}:${timemin}:${timesec}`
                const fulldate = `${day} ${month} ${year}`;
                console.log(fulldate)
                return (
                    <div>
                        <div className="blog-box">
                            <h2 className="author">
                                {blo.title}
                            </h2>
                            <div>{blo.text || blo.description}</div>
                            <h3>Written by {blo.author}</h3>
                            <div className="blog-date">
                                <div >{`${fulldate} ${fulltime}`}</div>
                            </div>
                        </div> 
                        
                    </div>
                )
            }) }   
            </div>
        </div>
       )
}
 
export default ShowBlogs;

