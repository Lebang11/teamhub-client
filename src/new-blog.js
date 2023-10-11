import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const NewBlog = () => {
    // const [text, setText] = useState('');
    const [done, setDone] = useState('Done');

    const createBlog= async () => {
        const author = Cookies.get('token_name');
        const textName = document.querySelector('.new-blog-text-box');
        const text = textName.value;
        const titleName = document.querySelector('.title-text-box');
        const title = titleName.value;

        console.log(text)
        console.log(author)
        console.log(title)

        setDone('Loading...')
        
        await axios.post('https://team-hub.onrender.com/api/blogs',
        {
            author,
            text,
            title
        }).then((res)=> console.log('Posted!', 'by', author)).catch(err=>console.log(err));
        setDone('Done')
        clearText()
    }

    function clearText() {
        const textarea = document.querySelector('.new-blog-text-box');
        textarea.value = '';

        const titlearea = document.querySelector('.title-text-box');
        titlearea.value = '';
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
                    <input placeholder="Title" className="form-control"></input>
                </div>
                <div>
                    <textarea name="blog" placeholder="text here" className="form-control" ></textarea>
                </div>
                
            </div>
            <div>
                <button className="btn btn-success m-1" onClick={createBlog}>{done}</button>
                <button className="btn btn-danger m-1" onClick={clearText}>clear</button>
            </div>
        </div>
    );
}
 
export default NewBlog;
