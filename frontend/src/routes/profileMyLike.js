import React, { Component } from 'react';
import PaginateGet from '../components/paginateGet';
import PaginateGet2 from '../components/paginateGet2';
class ProfileMyLike extends Component {
    render() {
        return (
            <div>
                <PaginateGet condition={{
                    nickname:window.sessionStorage.getItem('nickname'),
                    }}
                    url={"/api/"}
                    name="myProfile__like__artists"
                />
                <PaginateGet2 condition={{
                    id : window.sessionStorage.getItem('id'),
                }}
                    url={"/api/artworks/favorite"}
                    name="myProfile__like__artworks"
                />
            </div>
        );
    }
}

export default ProfileMyLike;