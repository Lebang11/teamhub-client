import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewChallenge = (props) => {
    const navigate = useNavigate();
    const today = new Date();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


    const createChallenge = async () => {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const language = document.getElementById('language').value
        const author = Cookies.get('token_name');
        const authorID = Cookies.get('token_id');
        const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}, ${today.getHours()}:${today.getMinutes()}`
        

        console.log(title);
        console.log(description);
        console.log(author);
        console.log(authorID);
        console.log(language);
        console.log(date);

        setLoading(true)


        if (title === '' || description ==='') {
            setError('Enter title and description')
            clearText()
            setLoading(false)
        } else {
            axios.post('https://teamhub-server-tau.vercel.app/api/challenges',
            {
                title,
                description,
                language,
                author,
                authorID,
                date,
            })
            .then(res => console.log(res))
            .then(res => sendNotification(`Challenge has been created by ${author}, click button to log in!`))
            .then(res => {
                clearText()
                alert('Challenge Created :)')
                setLoading(false)
                setMessage('Challenge posted successfully!')
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
        const textarea = document.getElementById('description');
        textarea.value = '';

        const titlearea = document.getElementById('title');
        titlearea.value = '';

        document.getElementById('language').value = 'any'
    }

    return (     
        <div className="w-100">
            
            <div>
                <h2>Add Challenge</h2>
            </div>
            
            <div>
                <input placeholder="Title" id="title" className="form-control w-75 mb-1"></input>
            </div>
            <div>
                <textarea name="blog" id='description' placeholder="Description" className="form-control w-75 mb-1" ></textarea>
            </div>

            <p className="text-danger text-center">{error}</p>
            <p className="text-success text-center">{message}</p>
            
            <select className="form-select w-50" id="language" defaultValue="any">
                <option selected value="any">Required Language</option>
                <option value="any">Any</option>  
                <option value="python">python</option>
                <option value="javascript">javascript</option>
                <option value="java">java</option>
                <option value="other">C/C++</option>
            </select>
               
        
        <div>
        {!isLoading && 
                <button className="btn btn-success m-1" onClick={createChallenge}>Done</button>
                }
                {!isLoading && 
                <button className="btn btn-danger m-1" onClick={clearText}>clear</button>
                
                }
                {isLoading && 
                <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
                }
        </div>
        <div>
        </div>
    </div>
        
     );
}
 
export default NewChallenge;