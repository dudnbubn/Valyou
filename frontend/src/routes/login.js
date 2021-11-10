import React, { useState, useEffect } from "react";
import axios from 'axios';

function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const handleInputID = (e) => {
        setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    const onClickLoginBtn = () => {
        axios.post('/api/users/', null, {
            params: {
                'userId': inputId,
                'userPw': inputPw
            }
        }).then(res => {
            console.log(res);
            console.log(res.data.userId);
            console.log(res.data.msg);
            if (res.data.userId === undefined) {
                alert('입력하신 id가 일치하지 않습니다.')
            } else if (res.data.userId === null) {
                alert('입력하신 비밀번호가 일치하지 않습니다.')
            } else if (res.data.userId === inputId) {
                sessionStorage.setItem('userId', inputId);
                alert('로그인에 성공하였습니다');
            }
            window.location.href = '/';
        }).catch()
    }
    useEffect(() => {
        //axios.get('').then(res=>console.log(res)).catch()
    },[]);
    return (
        <div className="main__wrap">
            <div className="login__wrap">
                <div className="login__id__wrap">
                    <label htmlFor="login__id">아이디(ID) : </label>
                    <input type="text" name="login__id" value={ inputId} className="login__id-input" onChange={ handleInputID}></input>
                </div>
                <div className="login__pwd__wrap">
                    <label htmlFor="login__pwd">비밀번호(Password) : </label>
                    <input type="password" name="login__pwd" value={inputPw} className="login__pwd-input" onChange={handleInputPw}></input>
                </div>
                <button type="button" className="login__btn" onClick={onClickLoginBtn}>로그인</button>
            </div>
        </div>
    );

}

export default Login;