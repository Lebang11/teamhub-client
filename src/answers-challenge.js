import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob, listAll } from "firebase/storage";
import { storage } from "./firebase";

const ChallengeAnswers = (props) => {
    const [dbanswers, setDbanswers] = useState([]);
    const [showanswers, setShowanswers] = useState(false)
    const [title, setText] = useState();
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState('');
    const [fileDownload, setFileDownload] = useState();
    const [email, setEmail] = useState('');
    const [isChallengeUser, setChallengeUser] = useState(false)

    const [downloadMessage, setDownloadMessage] = useState('Getting File...');

    const today = new Date()

    useEffect(() => {
        if (props.challengeAuthorID === Cookies.get('token_id')) {
            setChallengeUser(true)
            console.log('is user')
            getAnswers()
        } else {
            console.log('is not user')
            setChallengeUser(false)
        }
    }, []);


    const submitAnswer = async () => {
        const challengeAuthorID = props.challengeAuthorID
        const author = Cookies.get('token_name');
        const authorID = Cookies.get('token_id');
        const challengeID = props.challengeID;

        console.log(challengeAuthorID);
        console.log(author);
        console.log(title);
        console.log(authorID);
        console.log(challengeID);
        console.log(filename);


        await axios.post('https://team-hub.onrender.com/api/challenges/answers',
            {
                challengeAuthorID,
                author,
                title,
                authorID,
                challengeID,
                filename,
            }
        )
        .then(res => uploadFile())
        .then(res => sendNotification(`Your challenge was answered by ${author}`))
        .then(res => {
            alert('Challenge Answered :)')
            window.location.reload(false)
        })
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
        const challengeAuthorID = props.challengeAuthorID
        console.log(message);
        console.log(challengeAuthorID);
        
        axios.post('https://team-hub.onrender.com/api/email/notification', 
        {   
            authorID: challengeAuthorID,
            message: message
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const getAnswers = async () => {
        await fetch('https://team-hub.onrender.com/api/challenges/answers')
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
                            <input className="form-control rounded-0" onChange={(e) => setText(e.target.value)} placeholder="answer title" type="text" id="answer" value={title}/>
                            <button className="btn btn-primary btn-rounded-right" onClick={submitAnswer}>Post</button>
                        </div>
                        <input className="form-control w-75" type="file" onChange={async (e) => {
                        setFile(e.target.files[0]);
                        setFileName(`${today.getFullYear()}${today.getMonth()}${today.getDate()}${today.getHours()}${today.getMinutes()}-${e.target.files[0].name}`) 
                    }}/>
                        <div>
                            {isChallengeUser && showanswers && dbanswers.map((answer) => {
                                const date = new Date(answer.date)
                                const day = date.getDate()
                                const month = date.toLocaleString('default', {month: 'short'})
                                const year = date.getFullYear()
                                const timehours = date.getHours()
                                const timemin = date.getMinutes()
                                const timesec = date.getSeconds()
                                const fulltime = `${timehours}:${timemin}:${timesec}`
                                const fulldate = `${day} ${month} ${year}`;

                                if (answer.challengeID === props.challengeID) {
                                    download(answer)
                                    return (
                                    <div className="container-lg blog-box w-100 border border-bottom rounded p-4 m-1">
                                        
                                        <h6 className="display-6">
                                            {answer.title} 
                                        </h6>
                                        <p className="lead text-muted">
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
                        <div>
                            {!isChallengeUser && 
                            <h1 className="my-3">
                                *Only Challenge Owner can view answers
                            </h1>
                            }
                        </div>
                    </div>
                </div>
            </div> 
            
        </div>
    );
}
 
export default ChallengeAnswers;