import React from "react";
import "../css/Sign_up.css";

class Sign_up extends React.Component {
    render() {
        return (
            <div className="main__wrap">
                <h2 style={{textAlign:"center"}}>회원가입</h2>
                <form className="login__wrap">
                    <div className="input id">
                        <h3 className="id label">
                            <label for="id">아이디</label>
                        </h3>
                        <input type="text" id="id" />
                    </div>
                    <div className="input pwd">
                        <h3 className="pwd1 label">
                            <label for="pwd1">비밀번호</label>
                        </h3>
                        <input type="password" id="pwd1" />
                        <h3 className="pwd2 label">
                            <label for="pwd2">비밀번호 재확인</label>
                        </h3>
                        <input type="password" id="pwd2" />
                    </div>
                    <div className="input name">
                        <h3 className="name label">
                            <label for="name">이름</label>
                        </h3>
                        <input type="text" id="name" />
                    </div>
                    <div className="input birth">
                        <h3 className="birth label">
                            <label for="yy">생년월일 </label>
                        </h3>
                        <input type="text" id="yy" placeholder="년(4자)" aria-label="년(4자)" className="int" maxLength="4" />
                        <select id="mm" className="sel" aria-label="월">
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
                        <input type="text" id="dd" placeholder="일" aria-label="일" className="int" maxLength="2" />
                    </div>
                    <div className="input gender">
                        <h3 className="gender label">
                            <label for="gender">성별</label>
                        </h3>
                        <select id="gender" name="gender" className="sel" aria-label="성별">
                            <option value="" selected="">성별</option>
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                    <option value="U">선택 안함</option>
                        </select>
                    </div>
                    <div className="input email">
                        <h3 className="email label">
                            <label for="email">본인 확인 이메일</label>
                        </h3>
                        <input type="text" id="email" name="email" placeholder="선택입력" aria-label="선택입력" className="int" maxLength="100" />
                    </div>
                    <div className="input phone">
                        <h3 className="phone label">
                            <label for="phone">휴대전화</label>
                        </h3>
                        <input type="tel" id="phoneNo" name="phoneNo" placeholder="전화번호 입력" aria-label="전화번호 입력" className="int" maxLength="16" />
                        <button className="phone_btn">인증번호 받기</button>
                        <input type="tel" id="authNo" name="authNo" placeholder="인증번호 입력하세요" aria-label="인증번호 입력하세요" aria-describedby="wa_verify" className="int" disabled="" maxLength="4" />
                    </div>
                    <button type="button" className="submint_btn">가입하기</button>
                </form>
            </div>
        );
    }
}

export default Sign_up;