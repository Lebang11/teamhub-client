import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Problem from "./problem";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ProfilePage = () => {
    const {id} = useParams();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [profilePic, setProfilePic] = useState();
    const [imagename, setImageName] = useState('');
    const [image, setImage] = useState(null);
    const [imageDownload, setImageDownload] =  useState([]);
    const [showChangePic, setShowChangePic] =  useState(false);
    const [showChangeUsername, setShowChangeUsername] =  useState(false);
    const [gotImage, setGotImage] = useState(false)

    const [isUser, setIsUser] = useState();

    const navigate = useNavigate();

    useEffect( () => {
        try {
            findUser()
        } catch(err) {
            console.log(err)
        }
    }, []);

    

    const today = new Date();

    const findUser = async () => {
        await fetch(`https://team-hub.onrender.com/api/user?id=${id}`)
        .then(response => response.json())
        .then(res => {
            console.log(res);
            setImageName(res.imagename);
            setUserName(res.username);
            setEmail(res.email);
            downloadFile(res.imagename)
        })
        .catch(err => console.log(err)) 
    }

    const uploadImage = async () => {
        if (image === null) return;
        console.log(image.name);
        await axios.post(`https://team-hub.onrender.com/api/user`, 
        {
            id,
            imagename
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
        const imageRef = ref(storage, `profilePics/${imagename}`);
        uploadBytes(imageRef, image).then(() => {
            alert('Image Uploaded, name: ' + imagename)
            setShowChangePic(false);
            downloadFile()
        })
      }

    const uploadUsername = async () => {
        await axios.post(`https://team-hub.onrender.com/api/user`, 
        {
            id,
            username
        })
        .then(res => {
            alert('Username change to ' + username)
            document.getElementById('username').value = '';
            setShowChangeUsername(false);
            findUser()
        })
        .catch(err => console.log(err))
    }
    
    const downloadFile = async (imagename) => {
        if (!imagename) {
            setImageDownload('https://firebasestorage.googleapis.com/v0/b/team-hub-18735.appspot.com/o/profilePics%2FDefault_pfp.svg.png?alt=media&token=b3f4690b-2917-49d3-a075-efab941c082d')
            setGotImage(true)
        } else {
            let downloadRef = ref(storage, `profilePics/${imagename}`)
        getDownloadURL(downloadRef)
        .then((url) => {
            setImageDownload(url)
        })
        .then(res => {
            setGotImage(true)
        })
        .catch(err => console.log(err))
        }
        
        
        
        
        
    }

    const logout = () => {
        Cookies.remove('token_name');
        Cookies.remove('token_id');
        Cookies.remove('token_email');
        Cookies.remove('token_imagename');

        navigate('/')

    }

    // setTimeout(() => {
    //     downloadFile()}, 2000)


    return ( 
        <div>
            <div className="container-lg d-flex flex-column justify-content-center align-items-center">
                <div className="picture-area d-flex justify-content-center align-items-center">
                    {gotImage && <img className="w-100 h-100 rounded-circle" src={imageDownload}></img>}
                    {!gotImage && 
                    <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    }
                </div>
                <h2 className="display-5">
                    {username}
                </h2>
                    <h1 className="display-5 text-break">
                        {email}
                    </h1>
                
                
               {(id === Cookies.get(`token_id`)) &&
                <button onClick={() => {
                    if (showChangePic === false) {
                        setShowChangePic(true)  
                        setShowChangeUsername(false) 
                    } else {
                        setShowChangePic(false)
                    }
                    
                    }} className="btn btn-lg btn-primary my-1">
                    Change Profile Picture
                </button>}
                {(id === Cookies.get(`token_id`)) &&
                <button onClick={() => {
                    if (showChangeUsername === false) {
                        setShowChangeUsername(true)
                        setShowChangePic(false)   
                    } else {
                        setShowChangeUsername(false)
                    }
                    
                    }} className="btn btn-lg btn-primary my-1">
                    Change Username
                </button>}
                
                <div>
                    {showChangePic && 
                    <div>
                        <input id="image" className="form-control my-1" type="file" onChange={async (e) => {
                            setImage(e.target.files[0]);
                            setImageName(`${today.getFullYear()}${today.getMonth()}${today.getDate()}${today.getHours()}${today.getMinutes()}-${e.target.files[0].name}`) 
                        }} />
                        <div>
                            <button className="btn btn-success my-1" onClick={uploadImage}>
                                Change Profile Pic
                            </button>
                            <button className="btn btn-danger m-1" onClick={(e) => {
                                document.getElementById('image').type=""
                                document.getElementById('image').type="file"
                                setImage(null)
                                setImageName('')}}>
                                Clear
                            </button>
                        </div>
                        
                    </div>
                    }
                    {showChangeUsername &&
                    <div className="container-sm">
                        <input onChange={(e) => {
                            setUserName(e.target.value);
                        }} placeholder="Enter new username" id="username" type="text" className="my-1 form-control" />
                    <div>
                            <button className="btn btn-success my-1" onClick={uploadUsername}>
                                Change Username
                            </button>
                            <button className="btn btn-danger m-1" onClick={(e) => {
                                document.getElementById('username').value = '';
                                setImage(null)
                                setImageName('')}}>
                                Clear
                            </button>
                        </div>
                    </div>
                    
                    }
                    <div>
                        {id === Cookies.get('token_id') &&
                        <button onClick={logout} className="btn btn-danger my-1">
                                Logout
                            </button>
                        }
                            
                            
                        </div>
                </div> 
                
            </div>
            
        </div>
    );  
}
 
export default ProfilePage;