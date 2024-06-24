import theme from "../../redux/theme";
import Articles from "./articles";



const NewsPage = (props) => {
    return (
        <div>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="display-4 text-center">News</h2>
            
            <div className="blogs-box w-75">
                
            </div>
            <div className="w-75 d-flex justify-content-center">
                <Articles theme={theme}/>
            </div>
            </div>
        </div>
    )
}

export default NewsPage;
