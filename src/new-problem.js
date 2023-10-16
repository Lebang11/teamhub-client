import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";


const NewProblem = () => {
    // const [text, setText] = useState('');
    const [done, setDone] = useState('Done');
    const [filename, setFileName] = useState('');
    const [Url, setURL] = useState('');
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [fileDownload, setFileDownload] = useState();

    const today = new Date();



    const uploadFile = () => {
        if (file === null) return;
        console.log(file.name)
        const fileRef = ref(storage, `files/${filename}`);
        uploadBytes(fileRef, file).then(() => {
            alert('File Uploaded, name: ' + filename)
        })
        downloadFile();
      }

    const downloadFile = () => {
        const downloadRef = ref(storage, `files/${filename}`)
        getDownloadURL(downloadRef)
        .then((url) => {
            setFileDownload(url)
            console.log(fileDownload)
        })
        .catch(err => console.log(err))
        
    }

    const sendNotification = (message) => {
        axios.post('https://team-hub.onrender.com/api/email/notification', 
        {
            message
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const createProblem= async () => {
        const author = Cookies.get('token_name');
        const authorID = Cookies.get('token_id')
        const textName = document.getElementById('text');
        const text = textName.value;
        const titleName = document.getElementById('title');
        const title = titleName.value;
        const languageName = document.getElementById('language');
        const language = languageName.value;
        const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}, ${today.getHours()}:${today.getMinutes()}`;        
        
        uploadFile()         

        console.log(author);
        console.log(title);
        console.log(text);
        console.log(language);
        console.log(date);
        console.log(filename);

        setDone('Loading...');

        
        await axios.post('https://team-hub.onrender.com/api/problems',
        {
            author,
            authorID,
            title,
            text,
            language,
            date,
            filename

        }).then((res)=> console.log('Posted!', 'by', author)).catch(err=>console.log(err));
        sendNotification(`${author} has posted a problem, hop on Team-hub to help solve it :)`)
        setDone('Done')
        clearText()
    
        
    }


    function clearText() {
        const textarea = document.getElementById('text');
        textarea.value = '';

        const titlearea = document.getElementById('title');
        titlearea.value = '';
    }


    return ( 
        <div className="new-blog-blox w-100">
            
                <div>
                    <h2>Post problem</h2>
                </div>
                
                <div>
                    <input placeholder="Title" id="title" className="form-group w-75 mb-1"></input>
                </div>
                <div>
                    <textarea name="blog" id='text' placeholder="text here" className="form-group w-75 mb-1" ></textarea>
                </div>
                <div className="form-group mb-1">
                    <input className="form-control w-50" id="file" type="file" onChange={async (e) => {
                        setFile(e.target.files[0]);
                        setFileName(`${today.getFullYear()}${today.getMonth()}${today.getDate()}${today.getHours()}${today.getMinutes()}-${e.target.files[0].name}`) 
                    }} />
                </div>
                
                
                <select className="form-select w-50" id="language" defaultValue="python">
                    <option selected value="python">Pick language</option>
                    <option value="python">python</option>
                    <option value="javascript">javascript</option>
                    <option value="java">java</option>
                    <option value="other">other</option>
                </select>
                   
            
            <div>
                <button className="btn btn-success m-1" onClick={createProblem}>{done}</button>
                <button className="btn btn-danger m-1" onClick={clearText}>clear</button>
            </div>
            <div>
            </div>
        </div>
    );
}
 
export default NewProblem;
