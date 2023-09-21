import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

function MainPage() {
    const [info, setInfo] = useState('Details')

    const getInfo = async () => {
        const info = await axios.get('https://team-hub.onrender.com/api/main');
        console.log(Cookies.get('token'))
        setInfo(Cookies.get('token'))
    }
    

    return (
        <div>
            <div>
                Welcome
            </div>
            <button onClick={getInfo} className="user button">
                User details
            </button>
            <p>{info}</p>
        </div>
    )
}

export default MainPage;