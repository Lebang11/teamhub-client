import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ShowBlogs from "./blogs";
import NewBlog from "./new-blog";
import { Link } from "react-router-dom";
import NavBar from "./navbar";

function BlogPage() {
    const [username, setUser] = useState('');
    const [showBlogs, setShowBlogs] = useState(true);
    const [email, setEmail] = useState('');
    const [newBlog, setNewBlog] = useState(false);
    const [id, setId] = useState('');
    
    useEffect(() => {
                
        setUser(Cookies.get(`token_name`));
        setEmail(Cookies.get(`token_email`));
        setId(Cookies.get(`token_id`));
    }, []);
    
    if (!Cookies.get(`token_name`) || !Cookies.get(`token_email`) || !Cookies.get(`token_id`)){
        return (
            <div>
                <h1>Please Login</h1>
                <Link to='/login'>Login</Link> 
            </div>
        )
    } 
    
    
    const getInfo = async () => {

        if (showBlogs === true) {
            setShowBlogs(false);
        } else {
            setShowBlogs(true);
            setNewBlog(false)
        } 
    }

    const createBlog = () => {
        if (newBlog === true) {
            setNewBlog(false);
            setShowBlogs(true)
        } else {
            setNewBlog(true);
            setShowBlogs(false)
        } 
    }
    
    
    
    
    
    
    // const username = getInfo('name')
    // const email = getInfo('email')
    // const id = getInfo('id')

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 className="display-4">Blogs</h3>
                <div className="w-75 m-4 mt-1">
                    <button onClick={createBlog} className="btn btn-outline-secondary">new blog</button>
                {newBlog && <NewBlog />}
                </div>
                <div className="w-75 ">
                    {showBlogs && <ShowBlogs/>}
                </div>
                    
            
                    
                
            </div>
        </div>
    )
}

export default BlogPage;