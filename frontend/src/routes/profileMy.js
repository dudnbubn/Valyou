import React, { Component } from 'react';
import { Route, Routes ,Link } from 'react-router-dom';
import ProfileNavbar from '../components/myProfileNavbar';
import Recent from './profileMyRecent';
import Like from './profileMyLike';
import Donation from './profileMyDonation';
import ProfileMyInfo from './profileMyInfo';

class ProfileMy extends Component {
    goToWhereTab = (data) => {
        console.log(data);
        window.location.href = `/my_profile/${data}`;
    }
    render() {
        return (
            <>
                <ProfileNavbar onTab={ this.goToWhereTab} />
                <Routes>
                    <Route path="/recent" element={<Recent />} />
                    <Route path="/like" element={<Like />} />
                    <Route path="/donation" element={<Donation />} />
                    <Route path="/myInfo" element={<ProfileMyInfo/>} />
                </Routes>
            </>
        );
    }
}

export default ProfileMy;