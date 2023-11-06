import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Problem from "./problem";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ShowBlogs from "./blogs";
import Comments from "./comments";
import BlogPage from "./blog-page";
import ProblemPage from "./problem-page";
import ShowProblems from "./problems";
import Challenge from "./challenge";
import Challenges from "./challenges";

const ProfilePage = () => {
    const {id} = useParams();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [about, setAbout] = useState();
    const [github, setGithub] = useState(null);
    const [discord, setDiscord] = useState(null);

    const [profilePic, setProfilePic] = useState();
    const [imagename, setImageName] = useState('');
    const [image, setImage] = useState(null);
    const [imageDownload, setImageDownload] =  useState([]);
    const [showChangePic, setShowChangePic] =  useState(false);
    const [showChangeUsername, setShowChangeUsername] =  useState(false);
    const [showChangeAbout, setShowChangeAbout] =  useState(false);
    const [showChangeEmail, setShowChangeEmail] =  useState(false);
    const [showGithub, setShowGithub] = useState(false);
    const [showDiscord, setShowDiscord] = useState(false);
    const [isLoading, setLoading] = useState(true)

    const [isUser, setIsUser] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        if (Cookies.get("token_id") === id) {
            setIsUser(true)
        }
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
            console.log(res);
            setImageName(res.imagename);
            setUserName(res.username);
            setEmail(res.email);
            setAbout(res.about);
            setGithub(res.github);
            setDiscord(res.discord);

            if (!res.imagename) {
                setImageName('Default_pfp.svg.png')
            }

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

    const uploadGitHub = async () => {
        await axios.post(`https://team-hub.onrender.com/api/user`, 
        {
            id,
            github
        })
        .then(res => {
            alert('Github change to ' + github)
            document.getElementById('github').value = '';
            setShowGithub(false);
            findUser()
        })
        .catch(err => console.log(err))
    }

    const uploadDiscord = async () => {
        await axios.post(`https://team-hub.onrender.com/api/user`, 
        {
            id,
            discord
        })
        .then(res => {
            alert('Discord change to ' + discord)
            document.getElementById('discord').value = '';
            setShowDiscord(false);
            findUser()
        })
        .catch(err => console.log(err))
    }

    const uploadEmail = async () => {
        await axios.post(`https://team-hub.onrender.com/api/user`, 
        {
            id,
            email
        })
        .then(res => {
            alert('Email change to ' + email)
            document.getElementById('email').value = '';
            setShowChangeEmail(false);
            findUser()
        })
        .catch(err => console.log(err))
    }
    const uploadAbout = async () => {
        await axios.post(`https://team-hub.onrender.com/api/user`, 
        {
            id,
            about
        })
        .then(res => {
            alert('About changed to ' + about)
            document.getElementById('about').value = '';
            setShowChangeAbout(false);
            findUser()
        })
        .catch(err => console.log(err))
    }
    
    
    const downloadFile = async () => {
        let downloadRef = ref(storage, `profilePics/${imagename}`)
           getDownloadURL(downloadRef)
        .then((url) => {
            setImageDownload(url) 
        })
        .then(() => setLoading(false))
        .catch(err => console.log(err))


         
        
        
        
    }

    const logout = () => {
        Cookies.remove('token_name');
        Cookies.remove('token_id');
        Cookies.remove('token_email');
        Cookies.remove('token_imagename');

        navigate('/')

    }

    setTimeout(() => {
        downloadFile()}, 1000)


    return ( 
        <div>
            <div className="d-flex flex-wrap mt-4 gap-3">
                <div className="border border-top-0 border-bottom-0 border-start-0 border-2 px-4">
                    <div className="picture-area d-flex justify-content-center align-items-center">
                        {
                            !isLoading &&
                            <img className="w-100 h-100 rounded" src={imageDownload}></img>
                        }
                        {
                            isLoading &&
                            <div class="spinner-border text-primary" role="status">
                            <span class="sr-only"></span>
                            </div>
                        }
                    </div>
                </div>
                <div className="px-3 d-block w-75">
                    <div className="d-flex flex-column gap-3">
                        <div className="btn-group">
                            <button className="btn btn-secondary w-25 ">
                                name:
                            </button>
                            {!showChangeUsername && isUser && <div className="btn btn-light w-75" onClick={() => {
                                if (showChangeUsername === false) {
                                    setShowChangeUsername(true)
                                    setShowChangePic(false)
                                    setShowChangeEmail(false)
                                    setShowChangeAbout(false)   
                                } else {
                                    setShowChangeUsername(false)
                                }
                            }}>
                            {username}
                            </div>}
                            {
                                !showChangeUsername && !isUser &&
                                <div className="btn btn-light w-75">{username}</div>
                            }
                            {
                                showChangeUsername &&
                            <div className="btn btn-light w-75">
                                <input onChange={(e) => {
                                    setUserName(e.target.value);
                                }}  id="username" type="text" className="btn btn-light w-75" value={username}/>
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
                                <button className="btn btn-primary my-1" onClick={() => setShowChangeUsername(false)}>
                                    Cancel
                                </button>
                            </div>
                            
                            </div>
                            }
                           
                            
                        </div>
                        <div className="btn-group ">
                            <button className="btn btn-secondary w-25">
                                email:
                            </button>
                            {
                                !showChangeEmail && isUser &&
                                <button className="btn btn-light w-75" onClick={() => {
                                    if (showChangeEmail === false) {
                                        setShowChangeEmail(true)
                                        setShowChangePic(false)
                                        setShowChangeUsername(false)
                                        setShowChangeAbout(false)     
    
                                    } else {
                                        setShowChangeEmail(false)
                                    }
                                }}>
                                    {email}
                                </button>
                            }
                            {
                                !showChangeEmail && !isUser &&
                                <div className="btn btn-light w-75">{email}</div>
                            }
                            {
                                showChangeEmail &&
                                <div className="btn btn-light w-75">
                                    <input onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} id="email" type="text" className="btn btn-light w-75" value={email}/>
                                    <div>
                                    <button className="btn btn-success my-1" onClick={uploadEmail}>
                                        Change Email
                                    </button>
                                    <button className="btn btn-danger m-1" onClick={(e) => {
                                        document.getElementById('email').value = '';
                                        setImage(null)
                                        setImageName('')}}>
                                        Clear
                                    </button>
                                    <button className="btn btn-primary my-1" onClick={() => setShowChangeEmail(false)}>
                                        Cancel
                                    </button>
                                    </div>
                                </div>
                            }  
                        </div>
                        <div className="btn-group ">
                            <button className="btn btn-secondary w-25" >
                                About:
                            </button>
                            {
                                !showChangeAbout && isUser &&
                                <button className="btn btn-light w-75" onClick={() => {
                                    if (showChangeAbout === false) {
                                        setShowChangeAbout(true)
                                        setShowChangePic(false)
                                        setShowChangeUsername(false)
                                        setShowChangeEmail(false)
    
                                    } else {
                                        setShowChangeAbout(false)
                                    }
                                }}>
                                    {about}
                                </button>
                            }
                            {
                                !showChangeAbout && !isUser &&
                                <button className="btn btn-light w-75">
                                    {about}
                                </button>
                            }
                            {
                                showChangeAbout && isUser &&
                                <div className="btn btn-light w-75">
                                    <input onChange={(e) => {
                                        setAbout(e.target.value);
                                    }} id="about" type="text" className="btn btn-light w-75" value={about}/>
                                    <div>
                                    <button className="btn btn-success my-1" onClick={uploadAbout}>
                                        Change About
                                    </button>
                                    <button className="btn btn-danger m-1" onClick={(e) => {
                                        document.getElementById('about').value = '';
                                        setImage(null)
                                        setImageName('')}}>
                                        Clear
                                    </button>
                                    <button className="btn btn-primary my-1" onClick={() => setShowChangeAbout(false)}>
                                        Cancel
                                    </button>
                                    </div>
                                </div>
                            }  
                        </div>
                        <div>
                            {
                                github && 
                                 <a href={`https://github.com/${github}`} target="blank_" className="btn btn-secondary me-2 github" onClick={() => {
                                
                                }}><span><i class="bi bi-github me-1"></i></span>Github</a>
                            }
                            {   !github && isUser &&
                                <a className="btn btn-secondary me-2 github" onClick={() => {
                                    if (!showGithub) {
                                        setShowGithub(true)
                                    } else {
                                        setShowGithub(false)
                                    }
                                
                            }}><span><i class="bi bi-github me-1"></i></span>Add Github</a>
                            }

                            {                       
                                discord && 
                                 <a href="https://discordapp.com" className="btn btn-secondary me-2 discord"><span><i class="bi bi-discord me-1"></i></span>Discord: {discord}</a>
                            }
                            {   !discord && isUser &&
                                <a className="btn btn-secondary me-2 discord" onClick={() => {
                                    if (!showDiscord) {
                                        setShowDiscord(true)
                                    } else {
                                        setShowDiscord(false)
                                    }
                                
                            }}><span><i class="bi bi-discord me-1"></i></span>Add Discord</a>
                            }
                           
                           
                           {
                                showDiscord && isUser &&
                                
                                <div className="btn-group d-block mt-2">
                                    
                                    <input onChange={(e) => {
                                    setDiscord(e.target.value);
                                    }} placeholder="Enter discord username" id="github" type="text" className="btn btn-light w-75" value={discord}/>
                                    <button className="btn btn-success" onClick={uploadDiscord}>
                                            Add Discord
                                    </button>
                                </div>
                                }
                            {
                                showGithub && isUser &&
                                
                                <div className="btn-group d-block mt-2">
                                    
                                    <input onChange={(e) => {
                                    setGithub(e.target.value);
                                    }} placeholder="Enter github username" id="github" type="text" className="btn btn-light w-75" value={github}/>
                                <button className="btn btn-success" onClick={uploadGitHub}>
                                        Add Github
                                </button>
                                </div>
                                }
                            
                        </div>

                    </div>
                    

                </div>

                
            </div>
            
            <nav>
                <div class="nav nav-tabs m-3" id="nav-tab" role="tablist">
                    <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Blogs</a>
                    <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Issues</a>
                    <a class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Challenges</a>
                </div>
            </nav>
            
            
            <div class="tab-content ms-4" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <ShowBlogs profile={true} id={id}/>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <ShowProblems profile={true} id={id}/>
                </div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <Challenges profile={true} id={id}/>
                </div>
            </div>
        </div>
    );  
}
 
export default ProfilePage;