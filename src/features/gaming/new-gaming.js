import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewGamingProfile = (props) => {
    const navigate = useNavigate();
    const today = new Date();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [steamName, setSteam] = useState('');
    const [epicName, setEpicGames] = useState('');
    const [psnName, setPSN] = useState('');
    const [xboxName, setXbox] = useState('');
    const [eaName, setEa] = useState('');
    const [name, setName] = useState('');
    const [games, setGames] = useState('');



    const createGamingProfile = async () => {

        console.log(name);
        console.log(steamName);
        console.log(psnName);
        console.log(xboxName);
        console.log(epicName);
        console.log(eaName);
        console.log(games)

        setLoading(true)


        if (name === '' || games === '') {
            setError('Enter your name and your games');
            clearText();
            setLoading(false);
        } else {
            axios.post('https://teamhub-server-tau.vercel.app/api/gamers',
            {
                name,
                steamName,
                psnName,
                xboxName,
                epicName,
                eaName,
                games
            })
            .then(res => console.log(res))
            .then(res => {
                clearText()
                alert('Gamer Profile Created :)')
                setLoading(false)
                setMessage('Gamer profile posted successfully!')
                window.location.reload(false);
            })
            .catch(err => console.log(err))
        }
        
        
    }

    const sendNotification = (message) => {
        axios.post('https://teamhub-server-tau.vercel.app/api/email/notification', 
        {
            message: message
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    function clearText() {
        setName('');
        setSteam('');
        setPSN('');
        setXbox('');
        setEpicGames('');
        setEa('');
        setGames('');
    }

    function showField(fieldID) {
        const fieldHTML = document.getElementById(fieldID);
        if (fieldHTML.hidden) {
            fieldHTML.hidden = false;
        } else {
            fieldHTML.hidden = true;
        }
    }

    return (     
        <div className="w-100 d-flex flex-column align-items-center">
            <div>
                <h2 className="mt-3 mb-0">Add Gaming profile</h2>
            </div>
            <div className="btn-group">
                <button className="btn btn-lg" onClick={() => {
                    showField('steam');
                }}>
                    <i className="fa-brands fa-steam"></i>
                </button>
                <button className="btn btn-lg" onClick={() => {
                    showField('psn');
                }}>
                    <i className="fa-brands fa-playstation"></i>
                </button>
                <button className="btn btn-lg" onClick={() => {
                    showField('xbox');
                }}>
                    <i className="fa-brands fa-xbox"></i>
                </button>
                <button className="btn btn-lg" onClick={() => {
                    showField('epic');
                }}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADzElEQVR4nO2Yy0tbURCHbxeliy666aK7ttBld/kDrnM0opaiKMEn9YWKIilKFuJC6wsUH1hQRAWVigi+tRLQhfhEsQZRRAU3thYrKhhERSLNlBm8l6iJVZrcpHJ/MCRnco/Odx4z51xJ0qVLl66AV1BQ0DsA+CmEQI1sRwgR7jWAyz+IWhoA/PAmAPrDJB3gIc5Ab28vump9fZ39a2trqs/hcODm5iZmZmZe6WO1WrmdnJyMKysreH5+zv6joyMcGBjA4ODgwABQtLGx4RZgaWkJ3am0tFQ7gOnpaUxNTcWEhIQrAK2trdjU1KTOhDsAGnFSe3s7pqWl4dbWFre7urq0A1CCUUwBqKmpYTBF7vqcnp5yOzc3l9vkJ/X09OgAd56B+fl5HsH09PR/noHw8HCMjIzkT79vYgKgwO4DIPyRRi8uLjgQm812BWBvbw/tdruaHgMWwOphE7uqs7PzTgDZ2dlYUlKCGRkZ/gcYHx/HqqoqzMnJ8dgn4LOQuLYUPAGYzWZuj42NaQ9AVZYKVnl5+b0B9vf3uW2z2biYuRa2gMhCfwMYHR29sV+cTueNTe0TgNraWlxcXFStr6+P/f39/TyiBQUFNwDq6ur42cbGRjXvt7S08HGE+tASctfPJwBamqQDPNQZqKiowOXlZZydncWsrCz2mUwmXs9Ku7KyEoeHh/mSQut7cnISo6KicG5uTjWz2YzV1dV8P6B9EBsb63uAvLw8PDs7YwjalPHx8ezv6OhgPwVCbcrppObmZjw4OODvcXFx/FlUVISFhYUMTUcSeqahoQEjIiJ8D9DW1sYZhSrt7u4uBxwaGoqHh4ecbeiaGB0dzQCrq6scoHIDUwCOj4/ZTCYTP0fgOzs72hwl8vPz1RkYHBxkmLKyMvYR0MnJCd/KKLChoSGsr6/nu7ErAF0di4uLMSkpCbu7u3k2tre3eSY02QMU8MLCAq9rWsf0j+kwRr9ZLBYOnvaAUtRiYmLUPTA1NaWaxWLhekCDQEWOftfT6ENNo04/ADi9BgAANj8AfPMagNFofA0AI7fNBL3fmZmZ4VOlJ1FKnZiYwJSUlFtHHgBGZFl+JXlbsiy/FUJ8EUI4PAWQmJjIJ1PltSGJUiv5KI166gcAvwHgKwAYJF8LAF4KIT4DwImngKiY0QWFitv11yXXAj+nQZFl+Y2ktWRZfg4AnwDg8L5rHADsNAiyLL+Q/C2j0fhUCPERAL7fIfhfBB0SEvJMCjQZDIbHAPBBCLHmJvAtggwLC3si/Qd6JIR4L4Tov7T35PN3ULp0PUT9AT/gcQH59SOzAAAAAElFTkSuQmCC"/>
                </button>
                <button className="btn btn-lg" onClick={() => {
                    showField('ea');
                }}>
                <img style={{
                    "width": "7vw"
                }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABJlJREFUeF7tWFuoVVUUHcMixV4GfUiGFUiRUmmkCJWW1EdgEVS+II2brw+RyNKfSIsEjSL6ikqQCgo0CJKoDx+lH6lIkmiZgR+CBZqJlqK9Rnte9ol991lr77X32cb1nDV/Lvfs+RxrrrnmnESPE3s8fkQAYgb0OALxCvR4AsQiGK9AvAI9jkC8Aj2eAPEViFcgXoEeRyBegU4SQNJSAA93oqNAdinJ71vfJd0JYAzJDU3aq50Bkm4G8C2AYU06lOraSHJGJvhLAOwCcD2AW0mebMpmLQAkmdxmANOaciSj5xSAcSSPZgBYBuC19P91ybcFTdmtC8DTyWmsa8qJnJ6FJN/NBD8awIEEgCvS3wTgAZJbm7BfGQBJ1wKwu2l/m6btAO4jaUH2U3L3P3XUmUMA7iB5rlMH6gCwGsCsiob/AHCmRMaCfpLkwUzwZucjj9zLCVArK/rRxl4ZgE4NhspLuhrAdwCu88gYqBOSYmk8tWkwA2A1xmpNEe0AMDV7ZaoiMSgBkDQlqQVfAkHD2iKS71QNvMU/6ACQNBTAXnvvA4OyZ3MsyZ8C+QewDUYAXgLwoiMYu/OnPa/PhqRrnHlBAJA0256mOsoLZH4HsJzk31keSWPT07/MIftKWhQ/9OidTvKzqn4WZoCkGwDszzQhVfX7+J8h+WYu+CEAvko6zHscQj8CuN3efUmbAEx38BxJO0gDN5jKAPAZCzbgYNwDYLLj9BcDeMuj+EGS1npbY2SHYp3h5Q7eN0g+W8U5LwCSipqQKjayvJbyk0h+kzv9kWl6X+NQ/D7JeTn+5QDWOnj/AXA3yZ2hDjoBCGhCQvXn+V4n+Vz+R0kbk6v2uEPpr+n0dywHwKUAdlsj5JDZB+Aukn+GOOkD4FUA83MKrgRghl0UMp7+nJ7+gJZYku0TrN93UR/J9a0Pkqw4tlJ/EoDPPb3C8yRb02MhDkHPoKT8RJZV+h7Jp0LQdpy8BWNF9kaHvGsw+gTAowG2zgK4jeThMt5QAFwTmen+JW1CjpcZcn2XZC+BbZXyZG/++NxG6DEAH1ew8wXJh8r4SwFI+wDf2/sEySpO/eePpIkAvgZg2548rSJpDVE/SboqLZKjygLKfZ9D0jdN9rOWPYNFE9mmpJo/UtGhVkBFRaxt1pf0NoCFNWxZhtoKzf46qQwA30TWtraq4pykFckucY1Dpm3bI+netEEqzVaPD4UrtKI+YGoyam7zZIk1M1uqBJ3hNZtLAAx3yK8n2Zf9XZLd/TEBtm4CsMgD6v0krctsI98zWHUiC/CvlOVEmq51C2rRota7QvMB4JvISqPogGEuyQ86kLdiWbSqd67Q2gCQdEu677cs+L/Ilh/TOtnstBxNVvZF43TbCm0AAJKKJrILBcb5dMP7QxMGShYqNiPYrGAzQz/lASiayJrwz6XjBZK2aW6MSlZqi0nas+oEoKjfb8zBnKLT+dG4CUOSRnhesL9I/uYEoAnDF5uOus3FxRan198IQNccZc1AYgbUBK5rxGIGdM1R1gwkZkBN4LpGLGZA1xxlzUBiBtQErmvEYgZ0zVHWDKTnM+BfBhVjUL9YA30AAAAASUVORK5CYII="/>
                </button>
            </div>
            <div>
                <input placeholder="Your name" id="name" className="form-control mb-1" style={{
                    "width": "50vw",
                    "min-width": "250px"
                }} onChange={(e) => {
                    setName(e.target.value);
                }} value={name}></input>
            </div>
            <div>
                {/* <i className="fa-brands fa-steam"></i> */}
                {/* <i className="fa-brands fa-playstation"></i> */}
                {/* <i className="fa-brands fa-xbox"></i> */}

                <input placeholder={`Steam username`} id="steam" hidden className="form-control mb-1" style={{
                    "width": "50vw",
                    "min-width": "250px"
                }} onChange={(e) => {
                    setSteam(e.target.value);
                }} value={steamName}></input>
               
            </div>
            <div>
                <input placeholder="Epic Games username" hidden id="epic" className="form-control mb-1" style={{
                    "width": "50vw",
                    "min-width": "250px"
                }} onChange={(e) => {
                    setEpicGames(e.target.value);
                }} value={epicName}></input>
            </div>
            <div>
                <input placeholder="PSN username" id="psn" hidden className="form-control mb-1" style={{
                    "width": "50vw",
                    "min-width": "250px"
                }} onChange={(e) => {
                    setPSN(e.target.value);
                }} value={psnName}></input>
            </div>
            <div>
                <input placeholder="XBOX username" id="xbox" hidden className="form-control mb-1" style={{
                    "width": "50vw",
                    "min-width": "250px"
                }} onChange={(e) => {
                    setXbox(e.target.value);
                }} value={xboxName}></input>
            </div>
            <div>
                <input placeholder="EA username" id="ea" hidden className="form-control mb-1" style={{
                    "width": "50vw"
                    ,
                    "min-width": "250px"
                }} onChange={(e) => {
                    setEa(e.target.value);
                }} value={eaName}></input>
            </div>
            <div>
                <textarea name="blog" id='my-games' placeholder="My games" className="form-control mb-1" style={{
                    "width": "50vw",
                    "min-width": "250px",
                    "height": "20vh",
                    "min-height": "150px"
                }} onChange={(e) => {
                    setGames(e.target.value);
                }} value={games}></textarea>
            </div>

            <p className="text-danger text-center">{error}</p>
            <p className="text-success text-center">{message}</p>
            
        <div>
        {!isLoading && 
                <button className="btn btn-success m-1" onClick={createGamingProfile}>Done</button>
                }
                {!isLoading && 
                <button className="btn btn-danger m-1" onClick={clearText}>clear</button>
                
                }
                {isLoading && 
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
                }
        </div>
        <div>
        </div>
    </div>
        
     );
}
 
export default NewGamingProfile;