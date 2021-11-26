import React, { Component } from 'react';
import PaginateGet2 from '../components/paginateGet2';
class ProfileMyRecent extends Component {
    render() {
        return (
            <div>
                <PaginateGet2 condition={{
                    nickname:window.sessionStorage.getItem('nickname'),
                }}
                    url={"/api/"}
                    name="myProfile__recent__artworks"
                />
            </div>
        );
    }
}

export default ProfileMyRecent;