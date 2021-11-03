import React from "react";
import "../css/Login.css";

class Login extends React.Component {
    render() {
        return (
            <div className="main__wrap">
                <div className="login__wrap">
                    <div className="login__id">
                        <span>아이디 : </span>
                        <input className="login__id-input" type="text" ></input>
                    </div>
                    <div className="login__pwd">
                        <span>비밀번호 : </span>
                        <input className="login__pwd-input" type="password"></input>
                    </div>
                    <button className="login__btn">로그인</button>
                </div>
            </div>
        );
    }
}

export default Login;