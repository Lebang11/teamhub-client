import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import DownloadFile from "./downloadfile";


const Problem = (props) => {
    const fileDownload = props.fileDownload
    const setFileDownload = props.setFileDownload
    return ( 
        <div>
            <div className="blog-box">
                <h2 className="author">
                    {props.title}
                </h2>
                <div>{props.text}</div>
                <h3>Written by {props.author}</h3>
                <div className="blog-date">
                    <div >{props.date}</div>
                </div>
                <DownloadFile setFileDownload={setFileDownload} fileDownload={fileDownload} key={props.id} filename={props.filename}/>
            </div> 
        </div> 
     );
}
 
export default Problem;