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
    const [downloadMessage, setDownloadMessage] = useState('Get File');
    const [showAnswers, setShowanswers] = useState(false)

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

                return (
                    <div>
                        <div className="main-header">
                            <h1>
                                Welcome to Team-Hub
                            </h1>
                        </div>
                        <div className="back-button-div">
                            <Link to="/problems">
                                <button className="btn btn-secondary rounded-pill">Back</button>
                            </Link>
                        
                        </div>
                        <h2 className="problem-details-h2">
                            Problem
                        </h2>
                        <div className="blog-box rounded-0">
                        <h2 className="display-5 author">
                            {blo.title}
                        </h2>
                        <p className="lead">{blo.text}</p>
                        <h3 className="display-6">Written by {blo.author}</h3>
                        <div className="blog-date">
                            <div >{blo.date}</div>
                        </div>
                        <button className="btn btn-success mx-1" onClick={(atag) => {
                            setDownloadMessage('Loading...')
                
                            getDownloadURL(ref(storage, `files/${blo.filename}`))
                            .then((url) => {
                                setFileDownload(url)
                                setDownloadMessage('View '+ blo.filename)   
                            })
                            .catch(err => console.log(err))
                        }}>
                            <a  id="atag" href={fileDownload}>{downloadMessage}</a>
                        </button>
                        <button className="btn btn-info text-light" onClick={()=> {
                            if (showAnswers===false) {
                                setShowanswers(true)}
                            else {
                                setShowanswers(false)
                            }    
                                }}>
                            Show Answers
                        </button>
                        <div>
                                    {showAnswers && <Answers problemID={blo._id}/>}
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