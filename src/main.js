import { useState } from "react";
import Cookies from "js-cookie";
import ShowBlogs from "./blogs";

function MainPage() {
    const [info, setInfo] = useState('Details');
    const [username, setUser] = useState('');
    let showBlogs = false

    const getInfo = async (data) => {
        console.log(Cookies.get(`token_${data}`));
        setInfo(Cookies.get(`token_${data}`));
        setUser(Cookies.get(`token_name`));
        showBlogs = true
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