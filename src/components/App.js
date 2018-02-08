import React, { Component } from 'react';
import TopBar from './TopBar';
import InfiniteSideBar from './InfiniteSideBar'
import CurrentProfile from './CurrentProfile'
import SearchBar from './SearchBar'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            sinceCounter: 0,
            profile: {},
            repos: [],
            usersLogin: [],
            firstFetch: true
        }
        this.fetchRepos = this.fetchRepos.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
    }
    componentWillMount() {
        this.fetchData()
    }
    fetchRepos() {
        fetch(`https://api.github.com/users/${this.state.profile.login}/repos`)
            .then(res => { return res.json() })
            .then(data => {
                this.setState({ repos: data })
            })
    }
    fetchData() {
        let since = this.state.sinceCounter;
        fetch(`https://api.github.com/users?since=${since}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({ users: [...this.state.users, ...data] })
                let usersLogin = []
                data.map(item => {
                    usersLogin.push(item.login)
                })
                if (this.state.firstFetch) {
                    this.setState({ profile: this.state.users[0] })
                    this.setState({ firstFetch : false})
                }
                this.setState({ usersLogin: [...this.state.usersLogin, ...usersLogin] })
                return data;
            })
            .then(() => {
                this.setState({ sinceCounter: this.state.users[this.state.users.length - 1].id })
            })
            .then(this.fetchRepos)
            .catch(err => console.log('ERROR', err))
    }
    updateProfile(item){
        this.setState({
            profile: item
        }, this.fetchRepos)
    }
    render() {
        return (
            <div className="app">
                <TopBar>GitHub API Test</TopBar>
                <SearchBar className='search-bar' usersToSearch={this.state.usersLogin}
                    chosenProfile={(chosen) => {
                        chosen = this.state.users.filter((obj) => {
                            return obj.login === chosen
                        })
                        this.setState({ profile: chosen[0] }, this.fetchRepos)
                    }
                    }
                />
                <div className='main-body'>
                    <InfiniteSideBar fetch={this.fetchData} users={this.state.users} update={this.updateProfile}/>
                    <CurrentProfile profileData={this.state.profile} repos={this.state.repos} />
                </div>
            </div>
        )
    }
}