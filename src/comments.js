import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Comments = (props) => {
    const [dbComments, setDbComments] = useState([]);
    const [showComments, setShowComments] = useState(false)
    const [text, setText] = useState()

    useEffect(() => {
        getComments()
    }, []);

    const submitComment = async () => {
        const inputHTML = document.getElementById('comment');
        setText(text)
        const author = Cookies.get('token_name');
        const blogid = props.blogid

        await axios.post('https://team-hub.onrender.com/api/comments',
            {
                author,
                text,
                blogid
            }
        ).then(res => console.log('Commented by '+ author))
        .catch(err=> console.log(err))
        setText('');
        getComments()
    }

    const getComments = async () => {
        await fetch('https://team-hub.onrender.com/api/comments')
        .then(response => response.json())
        .then(res => {
            setDbComments(res)
        })
        setShowComments(true)
    }

    
    return ( 
        <div>
            <div className="blog-box comment-box" >
                <div >
                    <h3>Comments</h3>
                    <div >
                        <input onChange={(e) => setText(e.target.value)} placeholder="Comment here" type="text" id="comment" value={text}/>
                        <button onClick={submitComment}>Post</button>
                        <div>
                            {showComments && dbComments.map((comment) => {
                                const date = new Date(comment.date)
                                const day = date.getDate()
                                const month = date.toLocaleString('default', {month: 'short'})
                                const year = date.getFullYear()
                                const timehours = date.getHours()
                                const timemin = date.getMinutes()
                                const timesec = date.getSeconds()
                                const fulltime = `${timehours}:${timemin}:${timesec}`
                                const fulldate = `${day} ${month} ${year}`;

                                if (comment.blogid === props.blogid) {
                                return (
                                    <div className="blog-box">
                                        <div>
                                            {comment.text} 
                                        </div>
                                        <h4>
                                            by {comment.author}
                                        </h4>
                                        <div className="blog-date">
                                            {fulldate + ', ' + fulltime}
                                        </div>
                                    </div>
                                )}
                            })}
                        </div>
                    </div>
                </div>
            </div> 
            
        </div>
    );
}
 
export default Comments;