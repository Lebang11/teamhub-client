import { Link } from "react-router-dom";

const Challenge = (props) => {
    return ( 
        <div>
            <Link to={`/challenge/${props.challenge._id}`} className="problem-link">
                <div>
                    
                    <h1 className="display-3 author">
                        {props.challenge.title}
                    </h1>
                    <small className="text-success">{props.challenge.language} language</small>
                    <Link className='author-link w-25 d-block' to={`/user/${props.challenge.authorID}`}>
                        <p className="text-muted">Made by  <span className="author_name">{props.challenge.author}</span></p>
                    </Link>
                    <div className="blog-date">
                        <div >{props.challenge.date}</div>
                    </div>
                </div> 
            </Link>
        </div>
     );
}
 
export default Challenge;