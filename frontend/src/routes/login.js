import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../css/login.css';

function Login(props) {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const handleInputID = (e) => {
        setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    const onClickLoginBtn = () => {
        axios.post('/api/rest-auth/login/', {
                'email': inputId,
                'password': inputPw
        }).then(res => {
            const { token } = res.data;
            console.log(res.data)
            console.log(token)
            axios.defaults.headers.common['Authorization'] = "jwt " + token;
            window.sessionStorage.setItem('nickname',res.data.user.nickname);
            window.sessionStorage.setItem('id',res.data.user.id);
            props.onLogin(true);
            alert('로그인이 되었습니다.');
            window.location.href = "/";
        }).catch(() => {
            alert('아이디 혹은 비밀번호를 재확인해주세요.');
        })
    }
    return (
        <div className="login__wrap">
            <div className="login__id__wrap">
                <label htmlFor="login__id">아이디(ID) : </label>
                <input type="text" id="login__id" value={inputId}
                    className="login__id-input" onChange={handleInputID}
                    placeholder="이메일 형식으로 입력해주세요."></input>
            </div>
            <div className="login__pwd__wrap">
                <label htmlFor="login__pwd">비밀번호(Password) : </label>
                <input type="password" id="login__pwd" value={inputPw} className="login__pwd-input" onChange={handleInputPw}></input>
            </div>
            <button type="button" className="login__btn" onClick={onClickLoginBtn}>로그인</button>
        </div>
    );

}

export default Login;