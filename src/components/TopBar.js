import React from 'react';
export default ({children})=> {
    return(
        <div className="top-bar">
            <h1>{children}</h1>
            <a target='_blank' href='http://github.com'><img className="logo" src="static/icons/GitHub-Mark-120px-plus.png" alt="logo"/></a>
        </div>
    )   
}