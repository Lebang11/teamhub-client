import { useEffect, useState,  } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Answers from "./answers";
import Cookies from "js-cookie";
import axios from "axios";

const ProblemDetails = () => {
    const [dbProblems, setDbProblems] = useState([]);
    const [refresh, setRefresh] = useState('refresh')
    const [fileDownload, setFileDownload] = useState();
    const [downloadMessage, setDownloadMessage] = useState('Getting File...');
    const [showAnswers, setShowanswers] = useState(false)
    const [isUser, setIsUser] = useState(false);
    const [isLoading, setLoading] = useState(false)

    const download = async (blo) => {
        await getDownloadURL(ref(storage, `files/${blo.filename}`))
            .then((url) => {
                setFileDownload(url)
                setDownloadMessage('View '+ blo.filename)   
            })
            .then(res => {
                const downloadLink = document.getElementById('atag')
                downloadLink.setAttribute(
                    'download',
                    blo.filename,
                    );
            })
            .catch(err => console.log(err))
    }

    const getProblems =  async () => {
        
        await fetch('https://team-hub.onrender.com/api/problems')
        .then(response => response.json())
        .then(res => {
            setDbProblems(res)
            setRefresh('refresh');
            
        }
            )
        .catch(err => console.log(err));
        }

        
    
    useEffect(()=> {
        try {
            getProblems();
            
        } catch(err) {
            console.log(err);
        }
        
    }, [])



    const problemAnswered = async (problemID) => {
        setLoading(true)
        axios.post('https://team-hub.onrender.com/api/problems/answered',
        {
            problemID: problemID
        })
        .then(res => {
            setLoading(false)
            window.location.reload(false)
        })
        .then(res => alert('Problem Answered'))
        .catch(err => console.log(err))
    }
    
    const { id } = useParams();

    return ( 
        <div>
            <div>
            {
            dbProblems.map((blo) => {                
                if (blo._id === id) {
                    download(blo)
                    .then(res => {
                        if (Cookies.get('token_id') === blo.authorID) {
                            setIsUser(true)
                        }
                    })


                
                return (
                    <div>
                        
                        <div>
                            <Link to="/problems">
                                <button className="ms-4 btn btn-secondary rounded-pill">Back</button>
                            </Link>
                        
                        </div>
                        <h3 className="display-4 text-center">
                            {blo.title}
                        </h3>
                        <div className="blog-box rounded-0">
                        <p className="lead text-muted">{blo.text}</p>
                        <Link className='author-link' to={`/user/${blo.authorID}`}>
                            <figcaption className="blockquote-footer">Written by  <cite className="text-info">{blo.author}</cite></figcaption>
                        </Link>
                        {!isLoading && isUser && !blo.answered && 
                        <button className="btn btn-primary" onClick={()=> {
                            problemAnswered(blo._id)
                        }}>Click if answered</button>
                        }
                        {isLoading &&
                        <button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                        }
                        <div className="blog-date">
                            <div >{blo.date}</div>
                        </div>
                        <button className="btn btn-success mx-1" onClick={(atag) => {
                            setDownloadMessage('Loading...')
                        }}>
                            <a id="atag" href={fileDownload}>{downloadMessage}</a>
                        </button>
                        <button className="btn btn-info text-light" onClick={()=> {
                            if (showAnswers===false) {
                                setShowanswers(true)}
                            else {
                                setShowanswers(false)
                            }    
                                }}>
                            Show Answers <span className="badge border bg-info">{blo.answerCount}</span> 
                        </button>
                        <div>
                                    {showAnswers && <Answers problemID={blo._id} problemAuthorID={blo.authorID}/>}
                        </div>
                    </div> 
                    </div>
                )}
            }) }   
            </div>
        </div>
    );
}
 
export default ProblemDetails;