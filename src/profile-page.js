import { useEffect, useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ShowBlogs from "./features/blogs/blogs";
import ShowProblems from "./features/problems/problems";
import Challenges from "./features/challenges/challenges";

const ProfilePage = () => {
    const {id} = useParams();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [about, setAbout] = useState();
    
    const [github, setGithub] = useState(null);
    const [discord, setDiscord] = useState(null);
    const [linkedin, setLinkedIn] = useState(null);

    const [showGithub, setShowGithub] = useState(false);
    const [showDiscord, setShowDiscord] = useState(false);
    const [showLinkedIn, setShowLinkedIn] = useState(false);


    const [imagename, setImageName] = useState('');
    const [image, setImage] = useState(null);
    const [imageDownload, setImageDownload] =  useState([]);
    const [showChangePic, setShowChangePic] =  useState(false);
    const [showChangeUsername, setShowChangeUsername] =  useState(false);
    const [showChangeAbout, setShowChangeAbout] =  useState(false);
    const [showChangeEmail, setShowChangeEmail] =  useState(false);
    
    const [isLoading, setLoading] = useState(true)

    const [isUser, setIsUser] = useState(false);
    

    useEffect( () => {
        if (Cookies.get("token_id") === id) {
            setIsUser(true)
        }
        
        findUser()
    }, []);

        setTimeout(() => {
            downloadFile()}, 1000)
    

    const findUser = async () => {
        await axios.get(`https://teamhub-server-tau.vercel.app/api/user?id=${id}`)
        // .then(response => response.json())
        .then(res => {
            console.log(res.data);
            setImageName(res.data.imagename);
            setUserName(res.data.username);
            setEmail(res.data.email);
            setAbout(res.data.about);
            setGithub(res.data.github);
            setDiscord(res.data.discord);
            setLinkedIn(res.data.linkedin)

            if (!res.data.imagename) {
                setImageName('Default_pfp.svg.png')
            }

        })
        .catch(err => console.log(err)) 
    }

    const uploadImage = async () => {
        if (image === null) return;
        console.log(image.name);
        await axios.post(`https://teamhub-server-tau.vercel.app/api/user`, 
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
        await axios.post(`https://teamhub-server-tau.vercel.app/api/user`, 
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
        await axios.post(`https://teamhub-server-tau.vercel.app/api/user`, 
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

    const uploadLinkedIn = async () => {
        await axios.post(`https://teamhub-server-tau.vercel.app/api/user`, 
        {
            id,
            linkedin
        })
        .then(res => {
            alert('LinkedIn changed to ' + linkedin)
            document.getElementById('linkedin').value = '';
            setShowLinkedIn(false);
            findUser()
        })
        .catch(err => console.log(err))
    }

    const uploadDiscord = async () => {
        await axios.post(`https://teamhub-server-tau.vercel.app/api/user`, 
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
        await axios.post(`https://teamhub-server-tau.vercel.app/api/user`, 
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
        await axios.post(`https://teamhub-server-tau.vercel.app/api/user`, 
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

    
    


    return ( 
        <div className="mb-4">
            <div className="d-flex flex-wrap justify-content-space-between my-4 gap-3">
                <div className="border border-top-0 border-bottom-0 border-start-0 border-2 px-4 ">
                    <div className="picture-area d-flex justify-content-center align-items-center mb-3">
                        {
                            !isLoading && isUser &&
                                <img className="profile-image w-100 h-100 rounded" data-bs-target="#exampleModal" data-bs-toggle="modal" src={imageDownload} ></img>                        
                        }
                        {
                            !isLoading && !isUser &&
                                <img className="profile-image w-100 h-100 rounded" src={imageDownload} ></img>                        
                        }
                        {
                            isLoading &&
                            <div className="spinner-border text-primary position-relative" role="status">
                            <span className="sr-only"></span>
                            </div>
                        }
                        
                    </div>
                    {isUser && 
                        <p className="text-muted tip">*click to change</p>
                    
                    }
                    {
                        isUser && 
                        <input id="img-upload" type="file" className="form-control invisible " onChange={async (e) => {
                            setImage(e.target.files[0])
                            setImageName(e.target.files[0].name)
                        }}/>
                    }
                        
                </div>
                <div className="px-3 d-block w-75">
                    
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Change Image</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="file" className="form-control" onChange={(e) => {
                            console.log(e.target.files[0])
                            setImage(e.target.files[0])
                            setImageName(e.target.files[0].name)
                        }}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button data-bs-dismiss="modal" type="button" className="btn btn-primary" onClick={async () => {
                            await uploadImage();
                        }}>Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
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
                                 <a href={`https://github.com/${github}`} target="blank_" className="btn btn-secondary me-2 github"  onContextMenu={(e) => {
                                    if (!showGithub && isUser) {
                                        setShowGithub(true)
                                    } else if (isUser) {
                                        setShowGithub(false)
                                    }
                                        
                                }}><span><i className="bi bi-github me-1"></i></span>Github</a>
                            }
                            {   !github && isUser &&
                                <a className="btn btn-secondary me-2 github" onClick={() => {
                                    if (!showGithub) {
                                        setShowGithub(true)
                                    } else {
                                        setShowGithub(false)
                                    }
                                
                            }}><span><i className="bi bi-github me-1"></i></span>Add Github</a>
                            }

                            {                       
                                discord && 
                                 <a href="https://discordapp.com" target="blank_" className="btn btn-secondary me-2 discord" onContextMenu={(e) => {
                                    e.preventDefault()
                                    if (!showDiscord && isUser) {
                                        setShowDiscord(true)
                                    } else if (isUser) {
                                        setShowDiscord(false)
                                    }
                                        
                                }}><span><i className="bi bi-discord me-1"></i></span>Discord: {discord}</a>
                            }
                            {   !discord && isUser &&
                                <a className="btn btn-secondary me-2 discord"  onContextMenu={(e) => {
                                    if (!showLinkedIn) {
                                        setShowLinkedIn(true)
                                    } else {
                                        setShowLinkedIn(false)
                                    }
                                        
                                }} onClick={() => {
                                    if (!showDiscord) {
                                        setShowDiscord(true)
                                    } else {
                                        setShowDiscord(false)
                                    }
                                
                            }}><span><i className="bi bi-discord me-1"></i></span>Add Discord</a>
                            }
                            {
                                linkedin && 
                                 <a href={`https://${linkedin}`} target="blank_" className="btn btn-secondary me-2 linkedin"  onContextMenu={(e) => {
                                    if (!showLinkedIn && isUser) {
                                        setShowLinkedIn(true)
                                    } else if (isUser) {
                                        setShowLinkedIn(false)
                                    }
                                        
                                }}><span><i className="bi bi-linkedin me-1"></i></span>LinkedIn</a>
                            }
                            {   !linkedin && isUser &&
                                <a className="btn btn-secondary me-2 linkedin" onClick={() => {
                                    if (!showLinkedIn) {
                                        setShowLinkedIn(true)
                                    } else {
                                        setShowLinkedIn(false)
                                    }
                                
                            }}><span><i className="bi bi-linkedin me-1"></i></span>Add LinkedIn</a>
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
                            {
                                showLinkedIn && isUser &&
                                
                                <div className="btn-group d-block mt-2">
                                    
                                    <input onChange={(e) => {
                                    setLinkedIn(e.target.value);
                                    }} placeholder="Enter LinkedIn URL" id="linkedin" type="text" className="btn btn-light w-75" value={linkedin}/>
                                <button className="btn btn-success" onClick={uploadLinkedIn}>
                                        Add LinkedIn
                                </button>
                                </div>
                                }
                            {
                                isUser &&
                            <small className="text-muted tip">*right click to edit existing Github/Discord/LinkedIn</small>
                                
                            }
                           
                        </div>

                    </div>
                    

                </div>

                
            </div>
            
            <nav>
                <div className="nav nav-tabs m-3" id="nav-tab" role="tablist">
                    <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Blogs</a>
                    <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Issues</a>
                    <a className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Challenges</a>
                </div>
            </nav>
            
            
            <div className="tab-content ms-4 mb-4" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <ShowBlogs profile={true} id={id}/>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <ShowProblems profile={true} id={id}/>
                </div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <Challenges profile={true} id={id}/>
                </div>
            </div>
        </div>
    );  
}
 
export default ProfilePage;