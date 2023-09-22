import { useState } from "react";
import Cookies from "js-cookie";
import ShowBlogs from "./blogs";
import NewBlog from "./new-blog";

function MainPage() {
    const [username, setUser] = useState('');
    const [showBlogs, setShowBlogs] = useState(false);
    const [email, setEmail] = useState('');
    const [newBlog, setNewBlog] = useState(false);

    const getInfo = async () => {
        
        setUser(Cookies.get(`token_name`));
        setEmail(Cookies.get(`token_email`));
        if (showBlogs === true) {
            setShowBlogs(false);
        } else {
            setShowBlogs(true);
        } 
    }

    const createBlog = () => {
        if (newBlog === true) {
            setNewBlog(false);
        } else {
            setNewBlog(true);
        } 
    }
    
    
    
    
    
    
    // const username = getInfo('name')
    // const email = getInfo('email')
    // const id = getInfo('id')

    return (
        <div>
            <div className="main-header">
                <h1>
                    Welcome to Team-Hub
                </h1>
            </div>
            <div className="blogs-box">
                <h1 className="blogs-title">Blogs</h1>
                <div>
                    <button onClick={getInfo} className="blogs-button">view blogs</button>
                    <button onClick={createBlog} className="blogs-button">New Blog</button>
                </div>
                    {newBlog && <NewBlog />}
                <div>
                    {showBlogs && <ShowBlogs/>}
                </div>
            </div>
        </div>
    )
}

export default MainPage;