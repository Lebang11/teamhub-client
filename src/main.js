import { useState } from "react";
import Cookies from "js-cookie";
import ShowBlogs from "./blogs";
import axios from "axios";
import blogs from "./test.blogs.json"
import { json } from "react-router-dom";

function MainPage() {
    const [username, setUser] = useState('');
    const [showBlogs, setShowBlogs] = useState(false);
    const [email, setEmail] = useState('')

    const getInfo = async () => {
        // await axios.post('https://team-hub.onrender.com/api/blogs',
        // {
        //     author: 'Lebang',
        //     title: 'Test',
        //     text: 'Its only test that I want'
        // }).then((res)=> console.log('done')).catch(err=>console.log(err))
        
        setUser(Cookies.get(`token_name`));
        setEmail(Cookies.get(`token_email`));
        if (showBlogs === true) {
            setShowBlogs(false)
        } else {
            setShowBlogs(true);
        } 
    }

    const data = blogs.blogs[0]._id.$oid;

    console.log(data)
    
    
    
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
                <h2>Blogs</h2>
                <button onClick={getInfo} className="blogs-button">view blogs</button>
                <div>
                    {showBlogs && <ShowBlogs/>}
                </div>
            </div>
        </div>
    )
}

export default MainPage;