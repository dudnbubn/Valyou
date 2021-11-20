import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/profileMy.css';

class MyProfileNavbar extends Component {
    goToWhereTab = (e) => {
        const activeMyProfileNav = document.querySelector(".myProfile__nav-li.active");
        const newActiveMyProfileNav = e.target;
        
        activeMyProfileNav.classList.remove('active');
        newActiveMyProfileNav.classList.add('active');
    }

    render() {
        return (
            <ul className="myProfile__main__nav" onClick={this.goToWhereTab} >
                <li>
                    <Link to="/my_profile/recent" className="myProfile__nav-li">
                        최근 본 작품
                    </Link>
                </li>
                <li>
                    <Link to="/my_profile/like" className="myProfile__nav-li">
                        관심 작품
                    </Link>
                </li>
                <li>
                    <Link to="/my_profile/donation" className="myProfile__nav-li">
                        후원 내역
                    </Link>
                </li>
                <li>
                    <Link to="/my_profile/" className="myProfile__nav-li active">
                        내 정보
                    </Link>
                </li>
            </ul>
        );
    }
}

export default MyProfileNavbar;