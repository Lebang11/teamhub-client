
// import { useState } from "react";
// import { Link } from "react-router-dom";
import React from "react";
// import App from "./App";
import { useEffect, useState } from "react";
import Comments from "./comments";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import Cookies from "js-cookie";


const ShowBlogs = (props) => {
    const [dbBlogs, setDbBlogs] = useState([]);
    const [refresh, setRefresh] = useState('refresh');
    const [comment, setComment] = useState(false);
    const [imageDownload, setImageDownload] =  useState([]);
    const [imagename, setImageName] = useState('');
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useState('');


    const findUser = async () => {
        await fetch(`https://team-hub.onrender.com/api/user?id=${id}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setImageName(res.imagename)
            setUserName(res.username);
            setEmail(res.email)
           
        })
        .then(res => {
            })
        .catch(err => console.log(err))

    }

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
    
    const downloadFile = async () => {
        const downloadRef = ref(storage, `profilePics/${imagename}`)
        getDownloadURL(downloadRef)
        .then((url) => {
            setImageDownload(url)
        })
        .catch(err => console.log(err))
        
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
                        <div>
                            { <div className="blog-box">
                                <h2 className="author">
                                    {blo.title}
                                </h2>
                                <div>{blo.text || blo.description}</div>
                                <h3>Written by {blo.author}</h3>
                                <div className="blog-date">
                                    <div >{`${fulldate}, ${fulltime}`}</div>
                                </div>
                                <button onClick={
                                    () => {
                                        if (comment == false) {
                                            setComment(true)
                                        } else {
                                            setComment(false)
                                        }
                                        
                                    }
                                } className="done-button comment-button">Comments</button>
                                <div>
                                    {comment && <Comments blogid={blo._id}/>}
                                </div>
                            </div>} 
                        </div>
                        
                        
                    </div>
                )
            }) }   
            </div>
        </div>
       )
}
 
export default ShowBlogs;

