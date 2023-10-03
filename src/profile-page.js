import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Problem from "./problem";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
    const {id} = useParams();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [profilePic, setProfilePic] = useState();
    const [imagename, setImageName] = useState('');
    const [image, setImage] = useState(null);
    const [imageDownload, setImageDownload] =  useState([]);
    const [showChangePic, setShowChangePic] =  useState(false);


    useEffect( () => {
        const loadPage = async () => {
            await findUser()
        }
        loadPage().catch(console.error)
    
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
        const downloadRef = ref(storage, `profilePics/${imagename}`)
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
                    <button className="submit-button back-button">Back</button>
                </Link>
            </div>
                <h1>
                    Welcome to Team-Hub
                </h1>
            </div>
            <div className="blog-box">
                <div className="picture-area">
                    <img src={imageDownload}></img>
                </div>
                <h2>
                    {username}
                </h2>
                <h1>
                    {email}
                </h1>
               
                <button onClick={() => {
                    if (showChangePic === false) {
                        setShowChangePic(true)   
                    } else {
                        setShowChangePic(false)
                    }
                    
                    }} className="submit-button ">
                    Change Profile Picture
                </button>
                <div>
                    {showChangePic && 
                    <div>
                        <input type="file" onChange={async (e) => {
                            setImage(e.target.files[0]);
                            setImageName(`${today.getFullYear()}${today.getMonth()}${today.getDate()}${today.getHours()}${today.getMinutes()}-${e.target.files[0].name}`) 
                        }} />
                        <div>
                            <button onClick={uploadImage}>
                                Change Profile Pic
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