
// import { useState } from "react";
// import { Link } from "react-router-dom";
import React from "react";
// import App from "./App";
import blogs from "./test.blogs.json"

function ShowBlogs(props) {
    const blog = 
        // (
            <div className="blog-box">
                <h3 className="author">
                    Written by {props.username}
                </h3>
                <div>This is my first blog</div>
                <p></p>
                <div>email me: {props.email}</div>
            </div>
        // )

            (
                <div>
                    {blogs.blogs.map((blo) => {
                        return (
                            <div>
                                {/* <div className="blog-box">
                                    <h3 className="author">
                                        Written by {blo.author}
                                    </h3>
                                    <div>{blo.text}</div>
                                    
                                    <div>email me: </div>
                                </div> */}
                                test
                            </div>
                        )
                    })}
                </div>
            )
    return (
        <div>
            {blog}
        </div>
    );
}
 
export default ShowBlogs;

