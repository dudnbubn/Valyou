import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/artwork.css';

const Artwork = ({ location }) => {
    const artworkId = useParams().artworkId;

    const [work, setWork] = useState([]);
    const [recommendWork, setRecommendWork] = useState([]);
    const [myComment, setComment] = useState('');

    useEffect(() => {
        const id = window.sessionStorage.getItem('id');

        const url = '/api/artworks/' + artworkId + "/";
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setWork(res.data);
            }).catch(error => {
                console.log("artwork.js", error);
            });
        // axios.get("/api/artworks/", { params: { id:artworkId } })
        //     .then(res => {
        //         setRecommendWork(res.data);
        //     }).catch(error => {
        //         console.log("artwork.js recommend", error);
        //     });
        axios.post('/api/artworks/recent-view',{
            user : id,
            recent : artworkId
        }).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log("artwork.js", error);
        });

    }, []);
    const updateComment = (e) => {
        setComment(e.target.value);
    }
    const postComment = () => {
        axios.post('', { })
            .then(res => {
                alert('댓글이 등록되었습니다.')
            })
            .catch(() => {
                alert('댓글 등록에 문제가 생겼습니다.')
            })
    }
    return (
        <>
            <div className="artwork__viewer__title">
                <p>{work.title}</p>
            </div>
            <div className="artwork__viewer__work__wrap">
                <img className="artwork__viewer__work" src={work.file_img} alt={work.title}/>
            </div>
            <div className="artwork__viewer__info">
                { work.description}
            </div>
            <div className="artwork__viewer__artistNickname">
                {/*{work.artist.nickname}*/}
            </div>
            <button className="artwork__viewer__artistInfo">
                {/*<Link to={`/artist_profile/${work.artist.nickname}`}>이 작가의 다른 작품 더보기</Link>*/}
            </button>
            <div className="artwork__viewer__sponsor">
                {/*{work.sponsor.map(people => {
                    <li>{ people}</li>
                })}*/}
            </div>
            <div className="artwork__viewer__btns">
                <button className="work_like">좋아요 { work.like_count}</button>
                <button className="work_report">신고</button>
            </div>
            <div className="artwork__viewer__related_works">
                <img className="artwork__work" src={recommendWork.thumbnail} alt={ `${recommendWork.artistName}의 ${recommendWork.artworkTitle}`} />
                    <p>{recommendWork.artworkTitle}</p>
                    <p>{recommendWork.artistName}</p>
                    <p>{recommendWork.hashtag}</p>
            </div>
            <div className="artwork__viewer__comment">
                <div className="artwork__viewer__myComment">
                    <textarea className="myComment__input"
                        placeholder="욕설과 비방은 자제해 주세요."
                        onChange={ updateComment }
                    ></textarea>
                </div>
                <button className="myComment__btn" onClick={postComment}>등록</button>
                <ul>
                    나머지 코멘트들 pagination 이용해서 삽입
                </ul>
            </div>
        </>
    );
}

export default Artwork;