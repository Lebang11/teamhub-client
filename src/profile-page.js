import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Problem from "./problem";
import { useParams } from "react-router-dom";
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
    const [isUser, setIsUser] = useState();

    

    useEffect( () => {
        const loadPage = async () => {
            await findUser()
        }
        loadPage()
        .catch(err => console.error)
        
        
    }, []);

    

    const today = new Date();

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
        })
      }
    
    const downloadFile = async () => {
        
        let downloadRef = ref(storage, `profilePics/${imagename}`)
        getDownloadURL(downloadRef)
        .then((url) => {
            setImageDownload(url)
            
        })
        .catch(err => console.log(err))
        
        
    }

    setTimeout(() => {
        downloadFile()}, 1000)


    return ( 
        <div>
            
            <div className="main-header">
            <div className="back-button-div">
                <Link to="/main">
                    <button className="btn btn-secondary rounded-pill">Back</button>
                </Link>
            </div>
                <h1>
                    Team-Hub
                </h1>
            </div>
            <div className="container-lg d-flex flex-column justify-content-center align-items-center">
                <div className="picture-area d-flex justify-content-center align-items-center">
                    <img className="w-100 h-100 rounded-circle" src={imageDownload}></img>
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
                    } else {
                        setShowChangePic(false)
                    }
                    
                    }} className="btn btn-lg btn-primary">
                    Change Profile Picture
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
                </div> 
                
            </div>
            
        </div>
    );  
}
 
export default ProfilePage;