import { useEffect, useState,  } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Problem from "./problem";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Answers from "./answers";

const ProblemDetails = () => {
    const [dbProblems, setDbProblems] = useState([]);
    const [refresh, setRefresh] = useState('refresh')
    const [fileDownload, setFileDownload] = useState();
    const [downloadMessage, setDownloadMessage] = useState('Getting File...');
    const [showAnswers, setShowanswers] = useState(false)

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



    function refreshBlogs() {
        setRefresh('Refreshing...')
        getProblems();
        
    }
    
    const { id } = useParams();

    return ( 
        <div>
            <div>
            {
            dbProblems.map((blo) => {
                console.log(blo._id)
                
                if (blo._id === id) {
                    download(blo)
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
                            Show Answers ({blo.answerCount})
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