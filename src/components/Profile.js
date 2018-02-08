import React, {Component} from 'react'

export default ({avatar_url,id,login})=>{
    return(
        <div className='profile-main'>
            <img className='profile-pic' src={avatar_url}/>
            <div className='profile-id'>
                <p>{login}</p>
                <p>Github ID: {id}</p>
            </div>
        </div>
    )
}