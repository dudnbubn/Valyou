import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyProfileNavbar extends Component {
    goToWhereTab = (e) => {
        this.props.onTab(e.target.dataset.tab);
    }
    render() {
        return (
            <ul onClick={ this.goToWhereTab}>
                <li data-tab="recent">최근 본 작품</li>
                <li data-tab="like">관심 작품</li>
                <li data-tab="donation">후원 내역</li>
                <li data-tab="myInfo">내 정보</li>
            </ul>
        );
    }
}

export default MyProfileNavbar;