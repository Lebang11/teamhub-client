import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

function MainPage() {
    const [info, setInfo] = useState('Details')

    const getInfo = async (data) => {
        const info = await axios.get('https://team-hub.onrender.com/api/main');
        console.log(Cookies.get(`token_${data}`))
        setInfo(Cookies.get(`token_${data}`))
    }
    

    return (
        <div>
            <div>
                Welcome
            </div>
            <button onClick={(e) => {getInfo('name')}} className="user button">
                User name
            </button>
            <button onClick={(e) => {getInfo('email')}} className="user button">
                User email
            </button>
            <button onClick={(e) => {getInfo('id')}} className="user button">
                User id
            </button>

            <p>{info}</p>
        </div>
    )
}

export default MainPage;