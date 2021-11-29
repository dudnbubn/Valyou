import React, { Component,useRef, useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faFileUpload,faBell } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Alarms from './alarms';
import logo from "./logo.png";
import '../css/app.css';

function HomeHeader(props) {
    const myRef = useRef();
    const [choiceListX, setChoiceListX] = useState(0);
    const [alarmLoading, setAlarmLoding] = useState(true);
    const [alarmList, setAlarmList] = useState([]);

    const onSearch = (event) => {
        event.preventDefault();
        let searchWord = myRef.current.value;
        if (searchWord.length < 1) {
            alert('1글자이상 입력이 필요합니다.');
        } else {
            
        props.onSearch(searchWord);
        }
    }
    useEffect(() => {
        const beforeContainer = document.querySelector('.before_login');
        const afterContainer = document.querySelector('.after_login');
        const signUpContainer = document.querySelector('.before__signup-btn');
        
        if (props.isLoginCheck) {
            beforeContainer.classList.add('blind');
            signUpContainer.classList.add('blind');
            afterContainer.classList.remove('blind');
        } else {
            signUpContainer.classList.remove('blind');
            beforeContainer.classList.remove('blind');
            afterContainer.classList.add('blind');
        }
    }, [props.isLoginCheck]);
    const handleLogout = (event) => {
        event.preventDefault();
        props.onLogout(false);
        viewBottom();
        window.sessionStorage.clear();
        axios.defaults.headers.common['Authorization'] = "jwt " + '';
        window.location.href = "/";
    }
    const handleDefault = () => {
        props.onDefault();
    }
    const viewBottom = () => {
        const afterContainer = document.querySelector('.after_login');
        const choiceContainer = document.querySelector(".my__choiceList");
        if (choiceContainer.classList.contains('blind')) {
            choiceContainer.classList.remove('blind');
        } else {
            choiceContainer.classList.add('blind');
        }
    }
    //알림 내용 받아오기
    const alarmBottom = () => {
        if (window.sessionStorage.getItem('nickname')!==null) {
            showalarmBottom();
        axios.get('/api/', {})
            .then(res => {
                setAlarmList(res.data);
                setAlarmLoding(false);
            }).catch(error => {
                console.log('알림을 받아올 수 없습니다.');
                setAlarmLoding(true);
            })
        } else {
            alert('로그인이 필요합니다.');
            window.location.href = "/login";
        }
        
    }
    const showalarmBottom = () => {
        const alarmContainer = document.querySelector('.alarm__list');
        if (alarmContainer.classList.contains('blind')) {
            alarmContainer.classList.remove('blind');
        } else {
            alarmContainer.classList.add('blind');
        }
    }
    return (
        <header className="header">
            <div className="header__logo" >
                <Link to="/" onClick={handleDefault}>
                    <img src={logo} alt="valyou" style={{ width: "100px", height:"80px"}}/>
                </Link>
            </div>
            <form className="header__search" onSubmit={onSearch}>
                <input ref={myRef} type="text" id="se.keyword" className="search__input" title="검색어 입력" maxLength="18" placeholder="작품명/예술가명 혹은 해쉬태그를 통해 검색할 수 있습니다."/>
                <button type="buttond" className="search__btn" title="검색" alt="검색" onSubmit={onSearch}> 
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
                        <button className="btn__alarm" onClick={ alarmBottom}>
                            <FontAwesomeIcon icon={faBell} />
                        </button>
                    </li>
                    <li >
                        <button className="before_login">
                            <Link to="/login"> 로그인 </Link>
                        </button>
                        <button className="before__signup-btn">
                            <Link to="/sign_up">회원가입</Link>
                        </button>
                        <button className="after_login blind" onClick={viewBottom}>
                            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                        </button>
                        
                    </li>
                </ul>
            </div>
            <ul className="my__choiceList blind" style={{ right: `${choiceListX}`}}>
                <li>
                    <Link to={`/artist_profile/${window.sessionStorage.getItem('nickname')}`}><span>내 작가 페이지</span></Link>
                </li>
                <li>
                    <Link to="/my_profile/"><span>내 정보 페이지</span></Link>
                </li>
                <li>
                    <button className="logout__btn" type="button" onClick={handleLogout} style={{color:"white"}}>로그아웃</button>
                </li>
            </ul>
            <ul className="alarm__list blind">
                <Alarms loading={alarmLoading } posts={ alarmList }/>
            </ul>
        </header>
    );
}

export default HomeHeader;