import React, { Component } from 'react';
import PaginateGet from '../components/paginateGet';
import PaginateGet2 from '../components/paginateGet2';
class ProfileMyLike extends Component {
    render() {
        return (
            <div>
                <PaginateGet condition={{

                    }}
                    url={""}
                    name="myProfile__like__artist"
                />
                <PaginateGet2 condition={{

                }}
                    url={""}
                    name="myProfile__like__artworks"
                />
            </div>
        );
    }
}

export default ProfileMyLike;