import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../css/login.css';

function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [token, setToken] = useState('')

    const handleInputID = (e) => {
        setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    const JWT_EXPIRY_TIME = 24 * 3600 * 1000;
    const onSilentRefresh = () => {
        axios.post('/silent-refresh', {
                'email': inputId,
                'password': inputPw
        }).then(onLoginSuccess)
            .catch(error => {
                console.log('onsilentrefresh error', error);
            })
    }
    const onLoginSuccess=(response) => {
        const { accessToken } = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer${accessToken}`;
        setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    };
    const onClickLoginBtn = () => {
        axios.post('/api/rest-auth/login/', {
                'email': inputId,
                'password': inputPw
        }).then(res => {
            console.log(res);
            onLoginSuccess(res);
            console.log(res.data.token);
            setToken(res.data.token);
            //sessionStorage.setItem('userId', inputId);
            alert(`로그인에 성공하였습니다${token}`);
            //window.location.href = '/';
            console.log(token);
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