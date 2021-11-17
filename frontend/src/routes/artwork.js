import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/artwork.css';

const Artwork = ({ location }) => {
    const artworkId = useParams().artworkId;

    const [work, setWork] = useState([]);
    const [viewerArtistNickname, setViewerArtistNickname] = useState("");
    const [recommendWork, setRecommendWork] = useState([]);
    const [myComment, setMyComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const id = window.sessionStorage.getItem('id');

        //사용자의 최근 본 작품 목록에 추가
        if (window.sessionStorage.getItem('nickname') !== null) {

        }
        //작품 정보 받아오기
        const url = '/api/artworks/' + artworkId + "/";
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setWork(res.data);
                setViewerArtistNickname(res.data.artist.nickname);
            }).catch(error => {
                console.log("artwork.js", error);
            });
        //유사 추천 작품 받아오기
        axios.get("/api/artworks/", { params: { id:artworkId } })
            .then(res => {
                setRecommendWork(res.data);
            }).catch(error => {
                console.log("artwork.js recommend", error);
            });
        axios.get('', {
            "artwork":artworkId
        }).then(res => {
            setComments(res.data);
        }).catch(() => {
            alert('댓글을 받아오는데 실패했습니다.');
        })
    }, []);
    //코멘트 입력시 받아오기
    const updateComment = (e) => {
        if (window.sessionStorage.getItem('nickname') !== null) {
            setMyComment(e.target.value);
            
        } else {
            alert('로그인이 필요합니다.');
        }
    }
    const postComment = () => {
        axios.post('/api/artworks/comments', {
                "comment": myComment,
                "user": window.sessionStorage.getItem('id'),
                "artwork":artworkId,
            }).then(() => {
                alert('성공적으로 입력했습니다.');
            }).catch(() => {
                alert('입력에 실패했습니다.')
            }) 
    }
    const addLikeCount = () => {
        const likeCountIcon = document.querySelector('.sign__like');
        likeCountIcon.style.color = "red";  
        /*axios.post('',{})
            .then(() => {
                const likeCountIcon = document.querySelector('.sign__like');
                likeCountIcon.style.color = "red";
            })*/
    }
    return (
        <>
            
            <div className="artwork__viewer__work__wrap">
                <img className="artwork__viewer__work" src={work.file_img} alt={work.title}/>
            </div>
            <div className="artwork__viewer__title">
                <p>{work.title}</p>
            </div>
            <div className="artwork__viewer__artistNickname">                
                <button className="artwork__viewer__artistInfo">
                    <Link to={`/artist_profile/${viewerArtistNickname}`}>{viewerArtistNickname}</Link>
                </button>
            </div>
            <div className="artwork__viewer__info">
                { work.description}
            </div>
            
            <div className="artwork__viewer__sponsor">
                {/*{work.sponsor.map(people => {
                    <li>{ people}</li>
                })}*/}
            </div>
            <div className="artwork__viewer__btns">
                <button className="work_like" onClick={addLikeCount}>
                    <FontAwesomeIcon className="sign__like" icon={faHeart} style={{color:"gray", marginRight:"5px",}}/>
                    {work.like_count}
                </button>
                <button className="work_report">신고</button>
            </div>
            <div className="artwork__viewer__related_works">
                <img className="artwork__work" src={recommendWork.thumbnail} alt={ `${recommendWork.artistName}의 ${recommendWork.artworkTitle}`} />
                    <p>{recommendWork.artworkTitle}</p>
                    <p>{recommendWork.artistName}</p>
                    <p>{recommendWork.hashtag}</p>
            </div>
            <div className="artwork__viewer__comments">
                <div className="artwork__viewer__myComment">
                    <textarea className="myComment__input"
                        placeholder="욕설과 비방은 자제해 주세요."
                        onChange={ updateComment }
                    ></textarea>
                    <button className="myComment__btn" onClick={postComment}>등록</button>
                </div>
                
                <ul>
                    나머지 코멘트들 pagination 이용해서 삽입
                </ul>
            </div>
        </>
    );
}

export default Artwork;