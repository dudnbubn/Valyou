import React, { Component } from 'react';

class ProfileMyInfo extends Component {

    render() {
        return (
            <div>
                <div className="myProfile__ID">
                    <p>아이디(ID) : { }</p>
                </div>
                <div className="myProfile__pwd">
                    <p>비밀번호 변경</p>
                    <label htmlFor="current__password">현재 비밀번호</label>
                    <input type="password" id="current__password" />
                    <label htmlFor="change__password">변경 희망 비밀번호</label>
                    <input type="password" id="change__password" />
                    <label htmlFor="change__password-confirm">변경 희망 비밀번호 확인</label>
                    <input type="password" id="change__password-confirm" />
                </div>
                <div className="myProfile__nickname">
                    <p>닉네임(Nickname) : { }</p>
                </div>
                <div className="myProfile__image">
                    <img href="" alt=""/>
                    <label htmlFor="change__image">이미지 변경</label>
                    <input type="file" id="change__image" />
                </div>
                <div className="myProfile__cash">
                    <p>현재 잔액 : { }</p>
                </div>
                <button type="button">회원 탈퇴</button>
            </div>
        );
    }
}

export default ProfileMyInfo;