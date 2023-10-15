import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ShowBlogs from "./blogs";
import NewBlog from "./new-blog";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [username, setUser] = useState('');
    const [showBlogs, setShowBlogs] = useState(false);
    const [email, setEmail] = useState('');
    const [newBlog, setNewBlog] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
                
        setUser(Cookies.get(`token_name`));
        setEmail(Cookies.get(`token_email`));
        setId(Cookies.get(`token_id`));
    }, []);
    
    return ( 

        <div className="border-bottom mb-3">
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <a href="/blogs" className="navbar-brand">
                        <h3 className="fw-bold text-secondary ms-3">
                            Team-hub
                        </h3>
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
                                Problems
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