import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ParticlesComponent from './utilities/particles';
import ParticlesComponent2 from './utilities/particles2';
import { change } from "./redux/theme";



const NavBar = (props) => {
    const [username, setUser] = useState('');
    const [showBlogs, setShowBlogs] = useState(false);
    const [email, setEmail] = useState('');
    const [newBlog, setNewBlog] = useState(false);
    const [id, setId] = useState('');
    const [icon, setIcon] = useState(null);
    const [themeChanged, setTheme] = useState('')
    const [checked, setCheck] = useState(true);
    const [footerColour, setFooterColour] = useState('light')

    let theme = useSelector((state) => {return state.theme.value});


    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        setUser(Cookies.get(`token_name`));
        setEmail(Cookies.get(`token_email`));
        setId(Cookies.get(`token_id`));
    }, []);



    useEffect(() => {
        if (props.theme == 'dark') {
          setCheck(true)
        } else {
          setCheck(false)
        }
      }, [themeChanged])

    useEffect(() => {
        if (window.localStorage.getItem('theme') === 'dark') {
            changeIcon("team-hub-favicon-color.png")
        } else {
            changeIcon("team-hub-favicon-black.png")
        }
    }, [window.localStorage.getItem('theme')])
    
    const changeIcon = async (img) => {
        setIcon(img)
    }

    const changeTheme = () => {
        if (props.theme == 'dark') {
          window.localStorage.setItem('theme', 'light')
          dispatch(change('light'))
          document.documentElement.setAttribute('data-bs-theme', 'light')
          setTheme('light')
        } else {
          dispatch(change('dark'))
          window.localStorage.setItem('theme', 'dark')
          document.documentElement.setAttribute('data-bs-theme', 'dark')
          setTheme('dark')
        }
    }
    
    return ( 

        <div>
            {
          (window.localStorage.getItem('theme') == 'light') &&
        <ParticlesComponent id="particles" />
        }
        {
          (window.localStorage.getItem('theme') == 'dark') &&
        <ParticlesComponent2 id="particles" />
        }
            <nav className="border-bottom mb-3 navbar navbar-expand-sm">
                <div className="container-fluid">
                    <a className="btn navbar-brand" onClick={() => navigate("/")}>
                        <span className="d-flex align-items-center">
                        <img src={icon}  width="35" height="35" alt=""></img>
                        <h3 className="fw-bold text-secondary d-inline-block m-0 "> 
                            Team-Hub
                            </h3>
                        </span>
                        
                        
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="fals" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                
            
                <div id="main-nav" className="me-3 collapse navbar-collapse justify-content-end align-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="btn nav-link" onClick={() => navigate("/blogs")}>
                                Blogs
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn nav-link" onClick={() => navigate("/problems")}>
                                Issues
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn nav-link" onClick={() => navigate("/challenges")}>
                                Challenges
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={`/gaming`} className="btn nav-link">
                                Gaming
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/user/${id}`} className="btn nav-link">
                                Profile
                            </Link>
                        </li>
                        
                    </ul>
                </div>
                </div>
            </nav>
            <div className="form-check form-switch"  onClick={changeTheme}>
                <input id="theme-switch" className="form-check-input" checked={checked} type="checkbox"></input>
                <label for="theme-switch" >Dark mode</label>
            </div>
        </div>
     );
}
 
export default NavBar;