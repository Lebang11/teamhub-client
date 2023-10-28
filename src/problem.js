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
                    
                    <h2 className="display-5 author">
                        {props.title}
                    </h2>
                    <small className="text-muted">{props.text}</small>
                    <Link className='author-link w-75 d-block' to={`/user/${props.authorID}`}>
                        <h3 className="display-6">Written by  <span className="author_name">{props.author}</span></h3>
                    </Link>
                    <div className="blog-date">
                        <div >{props.date}</div>
                    </div>
                </div> 
            </Link>
            
        </div> 
     );
}
 
export default Problem;