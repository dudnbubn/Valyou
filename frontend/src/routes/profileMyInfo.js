import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileMyInfo=()=> {
    const [id, setId] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [isPwdConfirm, setIsPwdConfirm] = useState(false);
    const [pwdMessage, setPwdMessage] = useState("");
    const [newPwdConfirm, setNewPwdConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [preImage, setPreImage] = useState("");
    const [newImage, setNewImage] = useState("");
    const [cash, setCash] = useState(0);

    useEffect(() => {
        const user_id = window.sessionStorage.getItem('id')
        axios.get('/api/users/' + user_id + '/')
            .then(res => {
                setId(res.data.email);
                setNickname(res.data.nickname);
                setPreImage(res.data.artist_img);
                setCash(res.data.revenue);
                console.log(res.data)
            }).catch(error => {
                console.log(error);
            })
    }, [newImage]);
    const changePwd = (e) => {
        setNewPwd(e.target.value);
    }
    //비밀번호 확인 과정
    const cahngePwdConfirm = (e) => {
        const currentChangePwdConfirm = e.target.value;
        setNewPwdConfirm(currentChangePwdConfirm);
        if (newPwd === currentChangePwdConfirm) {
            setIsPwdConfirm(true);
            setPwdMessage("");
        }
        else {
            setIsPwdConfirm(false);
            setPwdMessage("비밀번호가 일치하지 않습니다.")
        }
    }
    //비밀 번호 변경 함수
    const sendChangePwd = () => {
        axios.post('', {
            password : newPwd
        }).then(() => {
            alert('비밀번호 변경에 성공하였습니다.');
        }).catch(() => {
            alert('비밀번호 변경에 실패하였습니다.');
        })
    }
    //이미지 변경 함수
    const imageChange = (e) => {
        const image = e.target.value
        axios.post('', {
            artistImage:image
        }).then(() => {
            setNewImage(image);
        }).catch(error => {
            console.log(error);
        })
    }
    //회원 탈퇴 버튼 작용 함수
    const memberLeave=() => {
        axios.delete('')
            .then(() => {
                window.sessionStorage.removeItem('nickname');
                window.location.href = "/";
            }).catch((error) => {
                console.log(error);
            })
    }
    
    const useConfirm = (message = null, onConfirm, onCancle) => {
        if (!onConfirm || typeof onConfirm !== "function") {
            return;
        }
        if (onCancle && typeof onCancle !== "function") {
            return;
        }
        const confirmAction = () => {
            if (window.confirm(message)) {
                onConfirm();
            } else {
                onCancle();
            }
        }
        return confirmAction;
    }
    const deleteConfirm = () => {
        //console.log("삭제했습니다.");
        //window.sessionStorage.clear();
        //axios.defaults.headers.common['Authorization'] = "jwt " + '';
        memberLeave()
    }
    const cancleConfirm = () => {
        console.log("취소했습니다.")
    }
    const confirmDelete = useConfirm(
        "정말로 탈퇴하시겠습니까?",
        deleteConfirm,
        cancleConfirm
    )
    return (
        <div>
            <div className="myProfile__ID">
                <p>아이디(ID) : {id}</p>
            </div>
            <div className="myProfile__pwd">
                <p>비밀번호 변경</p>
                <label htmlFor="change__password">변경 희망 비밀번호</label>
                <input type="password" id="change__password" onChange={changePwd} />
                <label htmlFor="change__password-confirm">변경 희망 비밀번호 확인</label>
                <input type="password" id="change__password-confirm" onChange={cahngePwdConfirm} />
                <button type="button" disabled={!isPwdConfirm} onClick={sendChangePwd} >비밀번호 변경하기</button>
                <p>{ pwdMessage}</p>
            </div>
            <div className="myProfile__nickname">
                <p>닉네임(Nickname) : {nickname }</p>
            </div>
            <div className="myProfile__image">
                <img href="" alt=""/>
                <label htmlFor="change__image">이미지 변경</label>
                <input type="file" id="change__image" onChange={ imageChange} />
            </div>
            <div className="myProfile__cash">
                <p>현재 잔액 : { cash }</p>
            </div>
            <button type="button" onClick={confirmDelete}>회원 탈퇴</button>
        </div>
    );

}

export default ProfileMyInfo;