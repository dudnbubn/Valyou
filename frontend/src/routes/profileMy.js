import React, { Component } from 'react';
import { Route, Routes ,Link } from 'react-router-dom';
import ProfileNavbar from '../components/myProfileNavbar';
import Recent from './profileMyRecent';
import Like from './profileMyLike';
import Donation from './profileMyDonation';
import ProfileMyInfo from './profileMyInfo';

class ProfileMy extends Component {
    render() {
        if (window.sessionStorage.getItem('nickname') === null) {
            alert('로그인이 필요한 작업입니다.');
            window.location.href = "/login";
        } else {
            return (
                <>
                    <ProfileNavbar />
                    <Routes>
                        <Route path="/recent" element={<Recent />} />
                        <Route path="/like" element={<Like />} />
                        <Route path="/donation" element={<Donation />} />
                        <Route exact path="/" element={<ProfileMyInfo/>} />
                    </Routes>
                </>
            );
        }
        
    }
}

export default ProfileMy;