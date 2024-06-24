import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const NewBlog = () => {
    // const [text, setText] = useState('');
    const [done, setDone] = useState('Done');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const createBlog= async () => {
        const author = Cookies.get('token_name');
        const text = document.getElementById('text').value
        const title = document.getElementById('title').value

        console.log(text)
        console.log(author)
        console.log(title)

        setLoading(true)

        if (text === '' || title === '') {
            setError('Enter title and text')
            clearText()
            setLoading(false)
        } else {
            await axios.post('https://teamhub-server-tau.vercel.app/api/blogs',
            {
                author,
                text,
                title
            }).then((res)=> console.log('Posted!', 'by', author)).catch(err=>console.log(err));
            setLoading(false)
            setError('')
            setMessage('Blog posted successfully!')
            clearText()
            window.location.reload(false);

        }
        
        
    }

    function clearText() {
        let text = document.getElementById('text')
        let title = document.getElementById('title')

        text.value = '';
        title.value = '';
    }


    return ( 
        <div className="new-blog-blox w-75">
            <div>
            </div>
            <div>
                <div>
                    <h2>New Blog</h2>
                </div>
                <div>
                    <input id="title" placeholder="Title" className="form-control"></input>
                </div>
                <div>
                    <textarea id="text" name="blog" placeholder="text here" className="form-control" ></textarea>
                </div>
                
            </div>
            <p className="text-center text-danger mb-1">{error}</p>
            <p className="text-center text-success mb-1">{message}</p>

            <div>
                {!isLoading && 
                <button className="btn btn-success m-1" onClick={createBlog}>{done}</button>
                }
                {!isLoading && 
                <button className="btn btn-danger m-1" onClick={clearText}>clear</button>
                
                }
                {isLoading && 
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
                }
            </div>
        </div>
    );
}
 
export default NewBlog;
