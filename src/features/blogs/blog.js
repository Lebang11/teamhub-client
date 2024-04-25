import { useState } from "react";
import { Link } from "react-router-dom";
import Comments from "../../utilities/comments";

const Blog = (props) => {
    const [comment, setComment] = useState(false);


    return ( 
        <div>
            { <div className="container-lg blog-box w-100 border border-bottom rounded-right my-2">
                                <h2 className="display-6 text-center text-secondary">
                                    {props.blo.title}
                                </h2>
                                <figure className="text-center">
                                    <blockquote className="text-muted">{props.blo.text || props.blo.description}</blockquote>
                                    <Link className='author-link' to={`/user/${props.blo.authorID}`}>
                                        <figcaption className="blockquote-footer">Written by  <cite className="text-info">{props.blo.author}</cite></figcaption>
                                    </Link> 
                                </figure>
                                
                                <div className="blog-date">
                                    <div >{`${props.fulldate}, ${props.fulltime}`}</div>
                                </div>
                                <button onClick={
                                    () => {
                                        if (comment == false) {
                                            setComment(true)
                                        } else {
                                            setComment(false)
                                        }
                                        
                                    }
                                } className="comment-button btn btn-outline-info">Comments <span className="badge border border-info text-info">{props.blo.commentCount}</span></button>
                                <div>
                                    {comment && <Comments blogid={props.blo._id}/>}
                                </div>
                            </div>} 
                    </div>
    )};
 
export default Blog;