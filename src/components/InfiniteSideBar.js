import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Profile from './Profile'
import CurrentProfile from './CurrentProfile'
import SearchBar from './SearchBar'

export default class InfiniteSideBar extends Component {
    constructor(props) {
        super(props)
    }   
    render() {
        return (
                <InfiniteScroll
                    pullDownToRefresh='false'
                    pullDownToRefreshContent={
                        () => console.log('pullDownToRefreshContent')
                    }
                    releaseToRefreshContent={
                        () => console.log('releaseToRefreshContent')
                    }
                    refreshFunction={() => {
                        console.log('refreshFunction')
                    }}
                    next={this.props.fetch}
                    hasMore={true}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }  
                    height={500}
                >
                <ul className='users-list'>
                    {
                        this.props.users.map(item =>
                            <li key={item.id} className="profile-li" onClick={()=> this.props.update(item)}>
                                <Profile {...item} />
                            </li>
                        )
                    }
                </ul> 
                </InfiniteScroll>
        )
    }
}
