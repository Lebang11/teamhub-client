import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ShowBlogs from "./blogs";
import NewBlog from "./new-blog";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { change } from "./theme";

const NavBar = (props) => {
    const [username, setUser] = useState('');
    const [showBlogs, setShowBlogs] = useState(false);
    const [email, setEmail] = useState('');
    const [newBlog, setNewBlog] = useState(false);
    const [id, setId] = useState('');
    const [icon, setIcon] = useState(null);

    const dispatch = useDispatch()
    let theme = window.localStorage.getItem('theme') || 'light';


    useEffect(() => {
        setUser(Cookies.get(`token_name`));
        setEmail(Cookies.get(`token_email`));
        setId(Cookies.get(`token_id`));

        if (theme === 'dark') {
            setIcon("team-hub-favicon-color.png")
        } else {
            setIcon("team-hub-favicon-black.png")
        }
    }, [theme]);
    
    
    return ( 

        <div className="border-bottom mb-3">

            

            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">
                        <span className="d-flex align-items-center">
                        <img src={icon}  width="35" height="35" alt=""></img>
                        <h3 className="fw-bold text-secondary d-inline-block m-0 "> 
                            Team-hub
                            </h3>
                        </span>
                        
                        
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="fals" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                
            
                <div id="main-nav" className="me-3 collapse navbar-collapse justify-content-end align-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="/blogs" className="nav-link">
                                Blogs
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/problems" className="nav-link">
                                Issues
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href={`/challenges`} className="nav-link">
                                Challenges
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href={`/user/${id}`} className="nav-link">
                                Profile
                            </a>
                        </li>
                        
                    </ul>
                </div>
                </div>
            </nav>
            
        </div>
     );
}
 
export default NavBar;