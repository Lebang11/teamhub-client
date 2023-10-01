import { useEffect, useState } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

const ShowProblems = (props) => {
    const [dbProblems, setDbProblems] = useState([]);
    const [refresh, setRefresh] = useState('refresh')

    

    const getProblems =  async () => {
        
        await fetch('https://team-hub.onrender.com/api/problems')
        .then(response => response.json())
        .then(res => {
            // setDbProblems(res)
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


    // const getDownload = async () => {
    //     const storage = getStorage();
    //     const fileRef = storageRef(storage, 'files/504575da-7a37-4b55-ae5f-aa3550161a7d-Lebang Nong_CV.pdf')
    
    //     await getDownloadURL(ref(storage, 'files/504575da-7a37-4b55-ae5f-aa3550161a7d-Lebang Nong_CV.pdf'))
    //     .then((url) => {
    //         // `url` is the download URL for 'images/stars.jpg'
    //         console.log(url)
    //         // This can be downloaded directly:
    //         const xhr = new XMLHttpRequest();
    //         // xhr.setRequestHeader({"X-Requested-With": "XMLHttpRequest", "Access-Control-Allow-Origin": "*"});
    //         xhr.responseType = 'blob';
    //         xhr.onload = (event) => {
    //         const blob = xhr.response;
    //         };
    //         xhr.open('GET', url);
    //         xhr.send();

    //         // Or inserted into an <img> element
    //         // const img = document.getElementById('myimg');
    //         // img.setAttribute('src', url);
    //     })
    //     .catch((error) => {
    //         // Handle any errors
    //     });

    //     // getBlob(fileRef)
    // }

    function refreshBlogs() {
        setRefresh('Refreshing...')
        getProblems();
        
    }
    
    

    return ( 
        <div>
            {/* <button onClick={getDownload}>Download</button> */}
            <button onClick={refreshBlogs} className="refresh-button">{refresh}</button>
            <div>
            {
            dbProblems.map((blo) => {
                
                return (
                    <div>
                        <div className="blog-box">
                            <h2 className="author">
                                {blo.title}
                            </h2>
                            {/* <div>{blo.text || blo.description}</div> */}
                            <h3>Written by {blo.author}</h3>
                            <div className="blog-date">
                                <div >{blo.date}</div>
                            </div>
                        </div> 
                        
                    </div>
                )
            }) }   
            </div>
        </div>
    );
}

export default ShowProblems;