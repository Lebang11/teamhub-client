
// import { useState } from "react";
// import { Link } from "react-router-dom";
import React from "react";
// import App from "./App";
import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user";
import Blog from "./blog";

const ShowBlogs = (props) => {
    const [dbBlogs, setDbBlogs] = useState([]);
    const [refresh, setRefresh] = useState('refresh');
    const [comment, setComment] = useState(false);
    const [imageDownload, setImageDownload] =  useState([]);
    const [imagename, setImageName] = useState('');
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => {return state.user.value});





    

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
        

        dispatch(login(true))
        console.log(user)
        
    }, [])

    function refreshBlogs() {
        setRefresh('Refreshing...')
        getBlogs();
        
    }

    if (props.profile) {
        return(
            <div className="mb-4">
                <button onClick={refreshBlogs} className="btn btn-outline-info mb-2">{refresh}</button>
                {
                dbBlogs.map((blo) => {

                    if (blo.authorID === props.id) {
                    
                    const date = new Date(blo.date)
                    const day = date.getDate()
                    const month = date.toLocaleString('default', {month: 'short'})
                    const year = date.getFullYear()
                    const timehours = date.getHours()
                    const timemin = date.getMinutes()
                    const timesec = date.getSeconds()
                    const fulltime = `${timehours}:${timemin}:${timesec}`
                    const fulldate = `${day} ${month} ${year}`;
                    
    
                    const downloadFile = async (id) => {
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
    
                        const downloadRef = ref(storage, `profilePics/${imagename}`)
                        getDownloadURL(downloadRef)
                        .then((url) => {
                            setImageDownload(url)
                        })
                        .catch(err => console.log(err))
                        
                    }
    
                    
                    
                    return (
                        <div >
                            <Blog blo={blo} fulldate={fulldate} fulltime={fulltime}/>
                        </div>
                    )}
                }) }     
            </div>
           )
    } else {

    return(
        <div className="mb-4">
            <button onClick={refreshBlogs} className="btn btn-outline-info mb-2">{refresh}</button>
            {
            dbBlogs.map((blo) => {
                
                const date = new Date(blo.date)
                const day = date.getDate()
                const month = date.toLocaleString('default', {month: 'short'})
                const year = date.getFullYear()
                const timehours = date.getHours()
                const timemin = date.getMinutes()
                const timesec = date.getSeconds()
                const fulltime = `${timehours}:${timemin}:${timesec}`
                const fulldate = `${day} ${month} ${year}`;
                

                const downloadFile = async (id) => {
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

                    const downloadRef = ref(storage, `profilePics/${imagename}`)
                    getDownloadURL(downloadRef)
                    .then((url) => {
                        setImageDownload(url)
                    })
                    .catch(err => console.log(err))
                    
                }

                
                
                return (
                    <div >
                        <Blog blo={blo} fulldate={fulldate} fulltime={fulltime}/>
                    </div>
                )
            }) }     
        </div>
       )
}}
 
export default ShowBlogs;

