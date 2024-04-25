import { Link } from "react-router-dom";

const Challenge = (props) => {
    return ( 
        <div>
            <Link to={`/challenge/${props.challenge._id}`} className="problem-link">
                <div className="text-center">
                    
                    <h1 className="display-5 author">
                        {props.challenge.title}
                    </h1>
                    <small className="text-success">{props.challenge.language} language</small>
                    <Link className="text-decoration-none" to={`/user/${props.challenge.authorID}`}>
                        <figcaption className="blockquote-footer my-1">Made by  <cite className="text-info">{props.challenge.author}</cite></figcaption>
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