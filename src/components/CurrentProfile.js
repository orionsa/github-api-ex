import React, { Component } from 'react'

export default class CurrentProfile extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className='main-current-profile'>
                <div className='profile-box'>
                    <a target='_blank' href={this.props.profileData.html_url}><img className='profile-image' src={this.props.profileData.avatar_url} /></a>
                    <div className='profile-data'>
                        <h1>{this.props.profileData.login}</h1>
                        <p>GitHub ID: {this.props.profileData.id}</p>
                    </div>
                </div>
                <div className='repos'>
                    <p>Related Projects</p>
                    <ul className='repos-list'>
                        {this.props.repos.map(repo => 
                             <li key={repo.id} >
                                 <img src='https://orionsa.github.io/github-api-ex/dist/static/icons/cat.png'/>
                                 <img className='blue-cat' src='https://orionsa.github.io/github-api-ex/dist/static/icons/BlueCat.png'/>
                                 <a target='_blank' href={repo.html_url}>{repo.name} - repo id is: {repo.id}</a>
                                 </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}