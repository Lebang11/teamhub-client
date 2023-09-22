
// import { useState } from "react";
// import { Link } from "react-router-dom";
import React from "react";
// import App from "./App";
import blogs from "./test.blogs.json"

function ShowBlogs() {
    const blog = () => {
        // (
        //     <div className="blog-box">
        //         <h3 className="author">
        //             Written by {props.username}
        //         </h3>
        //         <div>This is my first blog</div>
        //         <p></p>
        //         <div>email me: {props.email}</div>
        //     </div>
        // )

            (
                <div>
                    {blogs.map((blog) => {
                        return (
                            <div>
                                {blog.author}
                            </div>
                        )
                    })}
                </div>
            )
    
}
    return (
        <div>
            {blog}
        </div>
    );
}
 
export default ShowBlogs;

