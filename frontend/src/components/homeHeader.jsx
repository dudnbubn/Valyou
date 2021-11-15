import React, { Component, useRef } from 'react';
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faFileUpload,faBell } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

class HomeHeader extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    onSearch = (event) => {
        event.preventDefault();
        this.props.onSearch(this.myRef.current.value);
    }
    componentDidMount() {
        const beforeContainer = document.querySelector('.before_login');
        const afterContainer = document.querySelector('.after_login');
        const signUpContainer = document.querySelector('.before__signup-btn.blind');
        if (sessionStorage.getItem('userId') !== null) {
            beforeContainer.classList.add('blind');
            afterContainer.classList.remove('blind');
        } else {
            signUpContainer.classList.remove('blind');
            beforeContainer.classList.remove('blind');
            afterContainer.classList.add('blind');
        }
    }
    handleLogout = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('userId');
    }
    handleDefault = () => {
        this.props.onDefault();
    }
    render() {
        return (
        <header className="header">
            <div className="header__logo" >
                <Link to="/" onClick={this.handleDefault}>Valyou</Link>
            </div>
                <form className="header__search" onSubmit={this.onSearch}>
                    <input ref={this.myRef} type="text" id="se.keyword" className="search__input" title="검색어 입력" maxLength="18" placeholder="작품명/예술가명 혹은 해쉬태그를 통해 검색할 수 있습니다."/>
                    <button type="buttond" className="search__btn" title="검색" alt="검색" onSubmit={this.onSearch}> 
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            <div className="header__info">
                <ul className="header__info__btns">
                    <li className="btn__upload">
                        <Link to="/upload">
                                <FontAwesomeIcon icon={faFileUpload} style={{ verticalAlign: 0 }}/>
                        </Link>
                    </li>
                    <li>
                        <button className="btn__alarm">
                            <FontAwesomeIcon icon={faBell} />
                        </button>
                    </li>
                    <li >
                        <button className="before_login">
                            <Link to="/login"> 로그인 </Link>
                        </button>    
                        <button className="after_login blind">
                            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                        </button>                        
                        <ul className="my__choiceList">
                            <li>
                                <Link to="/my_profile">내 작가 페이지</Link>
                            </li>
                            <li>
                                <Link to="/my_profile">내 정보 페이지</Link>
                            </li>
                            <li>
                                <button type="button" onClick={this.handleLogout}>로그아웃</button>
                            </li>
                        </ul>    
                    </li>
                    <li>
                        <button className="before__signup-btn blind">
                            <Link to="/sign_up">회원가입</Link>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
    }
}

export default HomeHeader;