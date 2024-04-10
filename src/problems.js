import { useEffect, useState } from "react";
import Problem from "./problem";

const ShowProblems = (props) => {
    const [dbProblems, setDbProblems] = useState([]);
    const [refresh, setRefresh] = useState('refresh');

    

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
    if (props.profile) {
        return ( 
            <div>
                <button onClick={refreshBlogs} className="btn btn-outline-info mb-2">{refresh}</button>
                <div>
                {
                dbProblems.map((blo) => {
                    if (blo.authorID === props.id) {
                        
                    
                    return (
                            <div className="container-lg blog-box w-100 border border-bottom rounded-left my-0">
                            <Problem date={blo.date} _id={blo._id} filename={blo.filename} title={blo.title} text={blo.text} author={blo.author} authorID={blo.authorID} answered={blo.answered}/>   
                            </div>   
                    )}
                }) }   
                </div>
            </div>
        );
    }
    
    else {

    return ( 
        <div>
            <button onClick={refreshBlogs} className="btn btn-outline-info mb-2">{refresh}</button>
            <div>
            {
            dbProblems.map((blo) => {

                return (
                        <div className="container-lg blog-box w-100 border border-bottom rounded-left my-0">
                        <Problem date={blo.date} _id={blo._id} filename={blo.filename} title={blo.title} text={blo.text} author={blo.author} authorID={blo.authorID} answered={blo.answered}/>   
                        </div>   
                )
            }) }   
            </div>
        </div>
    );
}}

export default ShowProblems;