import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import {storage} from "./firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { v4 } from 'uuid';

const NewProblem = () => {
    // const [text, setText] = useState('');
    const [done, setDone] = useState('Done');
    const [filename, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [Url, setURL] = useState('');
    const [Ref, setRef] = useState('');
    const today = new Date();

    const handleFileUpload = async () => {
        // const file = selectedFile;
        // // setFileName(file.name)
        // // const formData = new FormData();
        // // formData.append('file', file);
        // // await axios
        // // .post("https://team-hub.onrender.com/api/problems", formData, {
        // //   headers: {
        // //     "Content-Type": "multipart/form-data",
        // //     "x-rapidapi-host": "file-upload8.p.rapidapi.com",
        // //     "x-rapidapi-key": "your-rapidapi-key-here",
        // //   },
        // // })
        // // .then((res) => console.log('file sent successfully'))
        // // .catch(err=> console.log(err))

        // let Ref = await ref(storage, `files/${v4()}-${selectedFile.name}`);        
        // uploadBytes(Ref, selectedFile).then(()=> {
        //     alert('Uploaded')
        // });
        // console.log(Ref.name)
    }

    const createProblem= async () => {
        const author = Cookies.get('token_name');
        const textName = document.querySelector('.new-blog-text-box');
        const text = textName.value;
        const titleName = document.querySelector('.title-text-box');
        const title = titleName.value;
        const languageName = document.getElementById('language');
        const language = languageName.value;
        const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}, ${today.getHours()}:${today.getMinutes()}`;        
        
        console.log(author);
        console.log(title);
        console.log(text);
        console.log(language);
        console.log(date);
        console.log(filename);

        setDone('Loading...');

        // handleFileUpload();
        
        await axios.post('https://team-hub.onrender.com/api/problems',
        {
            author,
            title,
            text,
            language,
            date,
            filename
        }).then((res)=> console.log('Posted!', 'by', author)).catch(err=>console.log(err));
        setDone('Done')
        clearText()
    
        
    }


    function clearText() {
        const textarea = document.querySelector('.new-blog-text-box');
        textarea.value = '';

        const titlearea = document.querySelector('.title-text-box');
        titlearea.value = '';
    }


    return ( 
        <div className="new-blog-blox">
            <div>
            </div>
            <div>
                <div>
                    <h2>Post problem</h2>
                </div>
                
                <div>
                    <input placeholder="Title" className="title-text-box"></input>
                </div>
                <div>
                    <textarea name="blog" placeholder="text here" className="new-blog-text-box" ></textarea>
                </div>
                <div>
                    <input type="file" onChange={(e) => {
                        setSelectedFile(e.target.files[0])
                        setFileName(e.target.files[0].name)
                    }} />
                </div>
                <div className="language-div">
                    <label>Pick a language:_ 
                        <select id="language" defaultValue="python">
                            <option value="python">python</option>
                            <option value="javascript">javascript</option>
                            <option value="java">java</option>
                            <option value="other">other</option>
                        </select>
                    </label>
                </div>
            </div>
            <div>
                <button className="done-button" onClick={createProblem}>{done}</button>
                <button className="done-button clear-button" onClick={clearText}>clear</button>
            </div>
            <div>
                <button onClick={() => {
                    getDownloadURL(Ref).then(url => {
                        console.log(Url)
                        setURL(Url)})
                }}>
                    {Url } 
                </button>
            </div>
        </div>
    );
}
 
export default NewProblem;
