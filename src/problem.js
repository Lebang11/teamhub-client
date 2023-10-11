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
                    
                    <h2 className="author">
                        {props.title}
                    </h2>
                    <p>{props.text}</p>
                    <h3>Written by {props.author}</h3>
                    <div className="blog-date">
                        <div >{props.date}</div>
                    </div>
                </div> 
            </Link>
            
        </div> 
     );
}
 
export default Problem;