import axios from 'axios';
import React, { useState } from 'react';
import '../css/signUp.css';

const SignUp = () => {
    //변수
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState();

    //오류 메세지
    const [nameMessage, setNameMessage] = useState('');
    const [idMessage, setIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMesaage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('');

    //유효성 검사
    const [isId, setIsId] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isNickname, setIsNickname] = useState(false);


    const handleSignUpId = (e) => {
        const checkId = new RegExp(/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
        const currentId = e.target.value;
        setId(currentId);

        if (!checkId.test(currentId)) {
            setIdMessage('이메일 형식으로 작성해주세요!');
            setIsId(false);
        } else {
            setIdMessage('올바른 형식 입니다:)');
            setIsId(true);
        }
    }
    const handleSignUpPwd = (e) => {
        const checkPwd = new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/);
        const currentPwd = e.target.value;
        setPassword(currentPwd);
        if (!checkPwd.test(currentPwd)) {
            setPasswordMessage('숫자, 영문자, 특수문자 조합으로 8자리 이상, 20자리 이하 입력해주세요!');
            setIsPassword(false);
        } else {
            setPasswordMessage('안전한 비밀번호 입니다!');
            setIsPassword(true);
        }
    }
    const handleSignUpPwd2 = (e) => {
        const currentPwdConfirm = e.target.value;
        setPasswordConfirm(currentPwdConfirm);
        console.log(passwordConfirm);
        if (password === currentPwdConfirm) {
            setPasswordConfirmMesaage('동일한 비밀 번호입니다:)');
            setIsPasswordConfirm(true);
        } else {
            setPasswordConfirmMesaage('비밀번호가 틀려요. 다시 확인해주세요.');
            setIsPasswordConfirm(false);
        }
    }
    const handleSignUpName = (e) => {
        const currentName = e.target.value;
        setName(currentName);

        if (currentName.length < 1) {
            setNameMessage('이름은 1자이상 입력해주세요.');
            setIsName(false);
        } else {
            setNameMessage('');
            setIsName(true);
        }
    }    
    const handleSignUpNickname = (e) => {
        setNickname(e.target.value);
    }
    const checkUniqueNickname = () => {
        axios.get('/api/users/', {
            params: { nickname: nickname }
        }).then((res) => {
            if (res.data === true) {
                setNicknameMessage('사용 가능한 닉네임입니다.');
                setIsNickname(true);
            } else {
                setNicknameMessage('다른 닉네임을 선택해주세요.');
                setIsNickname(false);
            }
        }).catch(error => {
            console.log("nickname check", error);
        })
    }
    const handleSignUpImage = (e) => {
        setImage(e.target.value);
    }
    const handleSignUpGender = (e) => {
        setGender(e.target.value);
    }
    const signUpSubmit = (e) => {
        console.log(id, password, passwordConfirm, nickname, name, gender,image);
        axios.post('/api/rest-auth/registration/', {
            email: id,
            password1: password,
            password2: password,
            artist_name: name,
            nickname: nickname,
            gender: gender,
            //artist_img : image
        }).then(() => {
            alert('회원가입에 성공하였습니다. 로그인해주세요.');
            window.location.href = "/login";
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <>
            <h2 style={{textAlign:"center"}}>회원가입</h2>
            <form className="signUp__wrap">
                <div className="input id">
                    <h3 className="id label">
                        <label htmlFor="id">아이디</label>
                    </h3>
                    <input type="text" id="id" onChange={handleSignUpId} />
                    <p className="signup__status__Message">{ idMessage }</p>
                </div>
                <div className="input pwd">
                    <h3 className="pwd1 label">
                        <label htmlFor="pwd1" >비밀번호</label>
                    </h3>
                    <input type="password" id="pwd1" onChange={handleSignUpPwd} />
                    <p className="signup__status__Message">{ passwordMessage }</p>
                </div>
                <div className="input pwd2">
                    <h3 className="pwd2 label">
                        <label htmlFor="pwd2">비밀번호 재확인</label>
                    </h3>
                    <input type="password" id="pwd2" onChange={handleSignUpPwd2} />
                    <p className="signup__status__Message">{passwordConfirmMessage}</p>
                </div>
                <div className="nickname">
                    <h3>
                        <label htmlFor ="nickname">닉네임</label>
                    </h3>
                    <input type="text" id="nickname" onChange={handleSignUpNickname} />
                    <button className="nickname__btn" type = "button" onClick={checkUniqueNickname}>중복여부확인</button>
                    <p className="signup__status__Message">{ nicknameMessage}</p>
                </div>
                <div className="myImage">
                    <h3>
                        <label htmlFor ="profileImage">이미지</label>
                    </h3>
                    <input type="file" id="profileImage" onChange={handleSignUpImage} />
                </div>
                <div className="input name">
                    <h3 className="name label">
                        <label htmlFor="name">이름</label>
                    </h3>
                    <input type="text" id="name" onChange={handleSignUpName} />
                    <p className="signup__status__Message">{nameMessage}</p>
                </div>
                <div className="input gender">
                    <h3 className="gender label">
                        <label htmlFor="gender">성별</label>
                    </h3>
                    <select id="gender" name="gender" className="sel" aria-label="성별" onChange={handleSignUpGender}>
                        <option defaultValue="M">남자</option>
                        <option value="F">여자</option>
                    </select>
                </div>
                <button
                    type="button"
                    onClick={signUpSubmit}
                    className="submint_btn"
                    disabled = {!(isId && isPassword && isPasswordConfirm && isName)}
                >가입하기</button>
            </form>
        </>
    );
    
}

export default SignUp;