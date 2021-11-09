import axios from 'axios';
import React, { Component,useState } from 'react';
const SignUp =()=> {
    const [signUPId, setSignUpId] = useState('');
    const [signUpPwd, setSignUpPwd] = useState('');
    const [signUpPwd2, setSignUpPwd2] = useState('');
    const [signUpNickname, setSignUpNickname] = useState('');
    const [signUpName, setSignUpName] = useState('');
    const [signUpBirthyy, setSignUpBirthyy] = useState('');
    const [signUpBirthmm, setSignUpBirthmm] = useState('');
    const [signUpBirthdd, setSignUpBirthdd] = useState('');
    const [signUpGender, setSignUpGender] = useState('');

    const handleSignUpId=(e) => {
        setSignUpId(e.target.value);
    }
    const handleSignUpPwd = (e) => {
        setSignUpPwd(e.target.value);
    }
    const handleSignUpPwd2 = (e) => {
        setSignUpPwd2(e.target.value);
    }
    const handleSignUpNickname = (e) => {
        setSignUpNickname(e.target.value);
    }
    const handleSignUpName = (e) => {
        setSignUpName(e.target.value);
    }
    const handleSignUpBirthyy = (e) => {
        setSignUpBirthyy(e.target.value);
    }
    const handleSignUpBirthmm = (e) => {
        setSignUpBirthmm(e.target.value);
    }
    const handleSignUpBirthdd = (e) => {
        setSignUpBirthdd(e.target.value);
    }
    const handleSignUpGender = (e) => {
        setSignUpGender(e.target.value);
    }
    const signUpSubmit = (e) => {
        console.log(signUPId, signUpPwd, signUpPwd2, signUpNickname, signUpName, signUpGender);
        axios.post('/api/users', null, {
            params: {
                userNickName: signUpNickname,
                userId: signUPId,
                userPwd: signUpPwd,
                userName: signUpName,
                userBirth: [signUpBirthyy,signUpBirthmm,signUpBirthdd],
                userGender: signUpGender,
            }
        }).then().catch();
    }
    return (
        <>
            <h2 style={{textAlign:"center"}}>회원가입</h2>
            <form className="signUp__wrap">
                <div className="input id">
                    <h3 className="id label">
                        <label for="id">아이디</label>
                    </h3>
                    <input type="text" id="id" onChange={handleSignUpId} />
                </div>
                <div className="input pwd">
                    <h3 className="pwd1 label">
                        <label for="pwd1" >비밀번호</label>
                    </h3>
                    <input type="password" id="pwd1" onChange={handleSignUpPwd} />
                    <h3 className="pwd2 label">
                        <label for="pwd2">비밀번호 재확인</label>
                    </h3>
                    <input type="password" id="pwd2" onChange={handleSignUpPwd2} />
                </div>
                <div className="nickname">
                    <h3>
                        <label for ="nickname">닉네임</label>
                    </h3>
                    <input type="text" id="nickname" onChange={handleSignUpNickname} />
                </div>
                <div className="input name">
                    <h3 className="name label">
                        <label for="name">이름</label>
                    </h3>
                    <input type="text" id="name" onChange={handleSignUpName} />
                </div>
                <div className="input birth">
                    <h3 className="birth label">
                        <label for="yy">생년월일 </label>
                    </h3>
                    <input type="number" id="yy" placeholder="년(4자)" aria-label="년(4자)" className="int" maxLength="4" onChange={ handleSignUpBirthyy}/>
                    <select id="mm" className="sel" aria-label="월" onSelect={handleSignUpBirthmm}>
                        <option value>월</option>
                        <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <input type="number" id="dd" placeholder="일" aria-label="일" className="int" maxLength="2" min="1" max="31" onChange={ handleSignUpBirthdd}/>
                </div>
                <div className="input gender">
                    <h3 className="gender label">
                        <label for="gender">성별</label>
                    </h3>
                    <select id="gender" name="gender" className="sel" aria-label="성별" onChange={handleSignUpGender}>
                        <option value="" selected="">성별</option>
                                <option value="M">남자</option>
                                <option value="F">여자</option>
                    </select>
                </div>
                <button type="button" onClick={signUpSubmit} className="submint_btn">가입하기</button>
            </form>
        </>
    );
    
}

export default SignUp;