import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Viewer from '../components/viewer';
import Comments from '../components/comments';
import RatingStar from '../components/ratingStar';
import '../css/artwork.css';
const Artwork = ({ location }) => {
    const artworkId = useParams().artworkId;

    const [work, setWork] = useState([]);
    const [viewerArtistNickname, setViewerArtistNickname] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [recommendWork, setRecommendWork] = useState([]);
    const myComment__input = useRef();

    const [fileExtension, setFileExtension] = useState('');

    useEffect(() => {
        const id = window.sessionStorage.getItem('id');

        //사용자의 최근 본 작품 목록에 추가
        if (window.sessionStorage.getItem('nickname') !== null) {

        }
        //작품 정보 받아오기
        const url = '/api/artworks/' + artworkId + "/";
        axios.get(url)
            .then(res => {
                setWork(res.data);
                var _fileLen = res.data.file_img.length;
                var _lastDot = res.data.file_img.lastIndexOf('.');
                var _fileExt = res.data.file_img.substring(_lastDot, _fileLen).toLowerCase();
                setFileExtension(_fileExt);
                setViewerArtistNickname(res.data.artist.nickname);
            }).catch(error => {
                console.log("artwork.js", error);
            });
        axios.post('/api/artworks/recent-view',{
            user : id,
            recent : artworkId
        }).then(res => {
            console.log(res.data);
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
    }, [artworkId]);

    //마우스가 별위에 올라가면 state변경
    const onMouseEnter = (index) => setHoverRating(index);
    //마우스가 별밖으로 나가면 state 0으로 변경
    const onMouseLeave = () => setHoverRating(0);
    //클릭시 별 index를 state에 저장
    const onSaveRating = (index) => setRating(index);

    //코멘트 입력시 받아오기
    const postComment = () => {
        let myComment = myComment__input.current.value
        if (true) {
            axios.post('/api/artworks/comments', {
                "comment": myComment,
                "user": window.sessionStorage.getItem('id'),
                "artwork": artworkId,
            }).then(() => {
                alert('성공적으로 입력했습니다.');
            }).catch(() => {
                alert('입력에 실패했습니다.')
            })
        } else {
            alert('댓글이 입력되지 않았습니다.');
        }
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
                <Viewer
                    extension={fileExtension}
                    files={work.file_img}
                    title={work.title}
                />
            </div>
            <div className="artwork__viewer__title">
                <p>{work.title}</p>
            </div>
            <div className="artwork__viewer__artistNickname">
                {viewerArtistNickname}    
                <button className="artwork__viewer__artistInfo" style={{display:'inline', fontSize:"30px"}}>
                    <Link to={`/artist_profile/${viewerArtistNickname}`}>
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                </button>
            </div>
            <div className="artwork__viewer__info">
                작품설명
                { work.description}
            </div>
            
            <div className="artwork__viewer__sponsor">
                후원인단
                {/*{work.sponsor.map(people => {
                    <li>{ people}</li>
                })}*/}
            </div>
            <RatingStar
                artworkId={artworkId}
                name="artwork__rating"
            />
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
                    <textarea ref={ myComment__input} className="myComment__input"
                        placeholder="욕설과 비방은 자제해 주세요."
                    ></textarea>
                    <button className="myComment__btn" onClick={postComment}>등록</button>
                </div>
                <Comments
                    url={`/api/artworks/comments/${artworkId}/`}
                    name="artwork__commens"
                />
            </div>
        </>
    );
}

export default Artwork;