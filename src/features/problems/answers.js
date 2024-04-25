import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob, listAll } from "firebase/storage";
import { storage } from "../../firebase";

const Answers = (props) => {
    const [dbanswers, setDbanswers] = useState([]);
    const [showanswers, setShowanswers] = useState(false)
    const [text, setText] = useState();
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState('');
    const [fileDownload, setFileDownload] = useState();
    const [email, setEmail] = useState('');

    const [downloadMessage, setDownloadMessage] = useState('Getting File...');

    const today = new Date()

    useEffect(() => {
        getAnswers()
    }, []);

    const submitAnswer = async () => {
        const author = Cookies.get('token_name');
        const authorID = Cookies.get('token_id');
        const problemID = props.problemID

        

        await axios.post('https://teamhub-server-tau.vercel.app/api/answers',
            {
                author,
                text,
                authorID,
                problemID,
                filename
            }
        )
        .then(res => console.log('answered by '+ author))
        .then(res => uploadFile())
        .then(res => sendNotification(`Your question was answered by ${author}`))
        .catch(err=> console.log(err))
        setText('');
        getAnswers()
    }

    const download = async (answer) => {
        getDownloadURL(ref(storage, `files/${answer.filename}`))
                    .then((url) => {
                        setFileDownload(url)
                        setDownloadMessage('View '+ answer.filename)   
                    })
                    .catch(err => console.log(err))
    }

    const sendNotification = (message) => {
        const problemAuthorID = props.problemAuthorID
        console.log(message);
        console.log(problemAuthorID);

        

        
        axios.post('https://teamhub-server-tau.vercel.app/api/email/notification', 
        {   
            authorID: problemAuthorID,
            message: message
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const getAnswers = async () => {
        await fetch('https://teamhub-server-tau.vercel.app/api/answers')
        .then(response => response.json())
        .then(res => {
            setDbanswers(res)
        })
        setShowanswers(true)
    }

    const uploadFile = async () => {
        if (file === null) return;
        console.log(file.name)
        const fileRef = ref(storage, `files/${filename}`);
        await uploadBytes(fileRef, file).then(() => {
            alert('File Uploaded, name: ' + filename)
        })
      }

    
        
    return ( 
        <div>
            <div className="container-lg" >
                <div >
                    <h3>answers</h3>
                    <div >
                        <div className="d-flex btn-group w-75">
                            <input className="form-control rounded-0" onChange={(e) => setText(e.target.value)} placeholder="answer here" type="text" id="answer" value={text}/>
                            <button className="btn btn-primary btn-rounded-right" onClick={submitAnswer}>Post</button>
                        </div>
                        <input className="form-control w-75" type="file" onChange={async (e) => {
                        setFile(e.target.files[0]);
                        setFileName(`${today.getFullYear()}${today.getMonth()}${today.getDate()}${today.getHours()}${today.getMinutes()}-${e.target.files[0].name}`) 
                    }}/>
                        <div>
                            {showanswers && dbanswers.map((answer) => {
                                const date = new Date(answer.date)
                                const day = date.getDate()
                                const month = date.toLocaleString('default', {month: 'short'})
                                const year = date.getFullYear()
                                const timehours = date.getHours()
                                const timemin = date.getMinutes()
                                const timesec = date.getSeconds()
                                const fulltime = `${timehours}:${timemin}:${timesec}`
                                const fulldate = `${day} ${month} ${year}`;

                                if (answer.problemID === props.problemID) {
                                    download(answer)
                                    return (
                                    <div className="container border border-light rounded m-2">
                                        
                                        <h6>
                                            {answer.text} 
                                        </h6>
                                        <p className="lead">
                                            
                                            by {answer.author}
                                        </p>
                                        <button className="btn btn-sm btn-outline-warning file-button mx-1" onClick={(atag) => {
                                            setDownloadMessage('Loading...')
                                
                                            
                                        }}>
                                            <a className="file-a text-warning  text-decoration-none" id="atag" href={fileDownload}>{downloadMessage}</a>
                                        </button>
                                        
                                    
                                        <div className="blog-date">
                                            {fulldate + ', ' + fulltime}
                                        </div>
                                    </div>
                                )}
                            })}
                        </div>
                    </div>
                </div>
            </div> 
            
        </div>
    );
}
 
export default Answers;