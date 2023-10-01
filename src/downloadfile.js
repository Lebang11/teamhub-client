import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";


const DownloadFile = (props) => {
    const [downloadMessage, setDownloadMessage] = useState('Get File');

    
    return (
        <div>
            <button  onClick={(atag) => {
                setDownloadMessage('Loading...')
                const downloadRef = ref(storage, `files/${props.filename}`)
                getDownloadURL(downloadRef)
                .then((url) => {
                    props.setFileDownload(url)
                    setDownloadMessage('View File')   
                })
                .catch(err => console.log(err))
            }}>
                <a id="atag" href={props.fileDownload}>{downloadMessage}</a>
            </button>
        </div>
    )
}
 
export default DownloadFile;