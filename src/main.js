import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ShowBlogs from "./features/blogs/blogs";
import NewBlog from "./features/blogs/new-blog";
import { Link } from "react-router-dom";
import NavBar from "./navbar";

function MainPage() {
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
            <NavBar/>
            <div className="container-md">
                <h1 className="blogs-title">Blogs</h1>
                <div>
                    <button onClick={getInfo} className="btn btn-outline-secondary btn-lg m-1">view blogs</button>
                    <button onClick={createBlog} className="btn btn-outline-secondary btn-lg m-1">new blog</button>
                    <Link to="/problems">
                        <button onClick={createBlog} className="btn btn-outline-secondary btn-lg m-1">view problems</button>
                    </Link>
                    <Link to={`/user/${id}`}>
                        <button className="btn btn-outline-secondary btn-lg m-1">view profile</button>
                    </Link>
                </div>
                    {newBlog && <NewBlog />}
            
                    {showBlogs && <ShowBlogs/>}
                
            </div>
        </div>
    )
}

export default MainPage;