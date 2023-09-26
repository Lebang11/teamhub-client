import { useEffect, useState } from "react";

const ShowProblems = (props) => {
    const [dbProblems, setDbProblems] = useState([]);
    const [refresh, setRefresh] = useState('refresh')
    

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
 

    return ( 
        <div>
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
                            <div>{blo.text}</div>
                            <h3>Written by {blo.author}</h3>
                            <p>{blo.date}</p>
                        </div> 
                        
                    </div>
                )
            }) }   
            </div>
        </div>
    );
}

export default ShowProblems;