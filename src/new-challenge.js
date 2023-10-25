import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NewChallenge = (props) => {
    const navigate = useNavigate();
    const today = new Date();


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
        


        axios.post('https://team-hub.onrender.com/api/challenges',
        {
            title,
            description,
            language,
            author,
            authorID,
            date,
        })
        .then(res => console.log(res))
        .then(res => {
            clearText()
            alert('Challenge Created :)')
            window.location.reload(false);
        })
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
        <div className="new-blog-blox w-100">
            
            <div>
                <h2>Add Challenge</h2>
            </div>
            
            <div>
                <input placeholder="Title" id="title" className="form-group w-75 mb-1"></input>
            </div>
            <div>
                <textarea name="blog" id='description' placeholder="Description" className="form-group w-75 mb-1" ></textarea>
            </div>

            
            
            <select className="form-select w-50" id="language" defaultValue="any">
                <option selected value="any">Required Language</option>
                <option value="any">Any</option>  
                <option value="python">python</option>
                <option value="javascript">javascript</option>
                <option value="java">java</option>
                <option value="other">C/C++</option>
            </select>
               
        
        <div>
            <button className="btn btn-success m-1" onClick={createChallenge}>Done</button>
            <button className="btn btn-danger m-1" onClick={clearText}>clear</button>
        </div>
        <div>
        </div>
    </div>
        
     );
}
 
export default NewChallenge;