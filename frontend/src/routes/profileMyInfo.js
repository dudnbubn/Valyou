import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/profileMy.css';
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
        setNewImage(image);
    }
    const pushChangedImage = () => {
        axios.patch('/api/users', {
            artist_img:newImage,
        }).then(() => {
            
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
        <div className="myInfo__wrap">
            <ul>
                <li className="myProfile__ID">
                    <h3>아이디(ID) : {id}</h3>
                </li>
                <li className="myProfile__pwd">
                    <h3>비밀번호 변경</h3>
                    <label htmlFor="change__password">변경 희망 비밀번호</label>
                    <input type="password" id="change__password" onChange={changePwd} />
                    <label htmlFor="change__password-confirm">변경 희망 비밀번호 확인</label>
                    <input type="password" id="change__password-confirm" onChange={cahngePwdConfirm} />
                    <button type="button" disabled={!isPwdConfirm} onClick={sendChangePwd} >비밀번호 변경하기</button>
                    <p>{ pwdMessage}</p>
                </li>
                <li className="myProfile__nickname">
                    <h3>닉네임(Nickname) : {nickname }</h3>
                </li>
                <li className="myProfile__image">
                    <img href={preImage} alt={nickname}/>
                    <label htmlFor="change__image"><h3>이미지 변경</h3></label>
                    <input type="file" id="change__image" onChange={imageChange} />
                    <button className="change__image-btn" onClick={pushChangedImage}>변경하기</button>
                </li>
                <li className="myProfile__cash">
                    <h3>현재 잔액 : { cash }</h3>
                </li>
                <li>
                    <button id="deleteID-btn" type="button" onClick={confirmDelete}>회원 탈퇴</button>
                </li>
            </ul>
        </div>
    );

}

export default ProfileMyInfo;