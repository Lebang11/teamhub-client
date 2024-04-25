import { useEffect, useState,  } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ChallengeAnswers from "./answers-challenge";

const ChallengeDetails = () => {
    const [dbChallenges, setDbChallenges] = useState([]);
    const [refresh, setRefresh] = useState('refresh')
    const [fileDownload, setFileDownload] = useState();
    const [downloadMessage, setDownloadMessage] = useState('Get File');
    const [showAnswers, setShowanswers] = useState(false)

    const getChallenges =  async () => {
        
        await fetch('https://teamhub-server-tau.vercel.app/api/challenges')
        .then(response => response.json())
        .then(res => {
            setDbChallenges(res)
            setRefresh('refresh');
            
        }
            )
        .catch(err => console.log(err));

        
        }

        
    
    useEffect(()=> {
        try {
            getChallenges();
        } catch(err) {
            console.log(err);
        }
        
    }, [])



    function refreshBlogs() {
        setRefresh('Refreshing...')
        getChallenges();
        
    }
    
    const { id } = useParams();

    return ( 
        <div>
            <div>
            {
            dbChallenges.map((blo) => {
                console.log(blo._id)
                
                if (blo._id === id) {

                return (
                    <div>
                        
                        <div>
                            <Link to="/challenges">
                                <button className="ms-4 btn btn-secondary rounded-pill">Back</button>
                            </Link>
                        
                        </div>
                        <h3 className="display-4 text-center">
                            {blo.title}
                        </h3>
                        <div className="container-lg blog-box w-100 rounded-0 border border-bottom">
                        <p className="lead text-muted">{blo.description}</p>
                        <Link className='author-link' to={`/user/${blo.authorID}`}>
                            <figcaption className="blockquote-footer">Written by  <cite className="text-info">{blo.author}</cite></figcaption>
                        </Link>
                        <div className="blog-date">
                            <div >{blo.date}</div>
                        </div>
                        {/* <button className="btn btn-success mx-1" onClick={(atag) => {
                            setDownloadMessage('Loading...')
                
                            getDownloadURL(ref(storage, `files/${blo.filename}`))
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
                        }}>
                            <a id="atag" href={fileDownload}>{downloadMessage}</a>
                        </button> */}
                        <button className="btn btn-info text-light" onClick={()=> {
                            if (showAnswers===false) {
                                setShowanswers(true)}
                            else {
                                setShowanswers(false)
                            }    
                                }}>
                            Answer (<span>{blo.answerCount}</span>)
                        </button>
                        
                        <div>
                                    {showAnswers && <ChallengeAnswers answerCount={blo.answerCount} challengeID={blo._id} challengeAuthorID={blo.authorID}/>}
                        </div>
                    </div> 
                    </div>
                )}
            }) }   
            </div>
        </div>
    );
}
 
export default ChallengeDetails;