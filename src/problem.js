import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import DownloadFile from "./downloadfile";
import { Link } from "react-router-dom";


const Problem = (props) => {
    const fileDownload = props.fileDownload
    const setFileDownload = props.setFileDownload
    return ( 
        <div>
            <Link to={`/problems/${props._id}`} className="problem-link">
                <div>
                    
                    <h2 className="display-6 text-secondary text-center">
                        {props.title}
                    </h2>
                    <figure className="text-center">
                        <blockquote className="text-muted">{props.text}</blockquote>
                        <Link className='author-link w-75 d-block' to={`/user/${props.authorID}`}>
                            <figcaption className="blockquote-footer">Written by  <cite className="text-info">{props.author}</cite></figcaption>
                        </Link>
                    </figure>
                    
                    <div className="blog-date">
                        <div >{props.date}</div>
                    </div>
                </div> 
            </Link>
            
        </div> 
     );
}
 
export default Problem;