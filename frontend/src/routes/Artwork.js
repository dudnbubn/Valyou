import axios from 'axios';
import React, { Component } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
const Artwork = () => {
    
    const artworkId = useParams();
    {/*const work = await axios.get("/artworks", { params: { artworkId: artworkId } });*/ }
    const work = { artworTitle: "hello", artwork: "image", artistName: "lee",userId:"21", sponsor: ["kim", "park"], explain: "this is ~", hashtag: "#happy", like: 100 };
    {/*const recommendWork = await axios.get("/artworks", { params: { artworkId: artworkId } });*/ }
    const recommendWork = {artworkTitle: "recommend", thumbnail: "thumbnail", artistName: "lee", hashtag: "#excited"}
    return (
        <>
            <div className="work_name">
                {work.artworTitle}
            </div>
            <div className="work">
                { work.artwork}
            </div>
            <div className="work_information">
                { work.explain}
            </div>
            <div className="artist_information">
                {work.artistName}
            </div>
            <button className="artist__info__btn">
                <Link to={`/artist_profile/${work.userId}`}>이 작가의 다른 작품 더보기</Link>
            </button>
            <div className="sponsor">
                {work.sponsor.map(people => {
                    <li>{ people}</li>
                })}
            </div>
            <div className="btn_w">
                <button className="work_like">좋아요 { work.like}</button>
                <button className="work_report">신고</button>
            </div>
            <div className="related_work_recommendation">
                <img src={recommendWork.thumbnail} alt={ `${recommendWork.artistName}의 ${recommendWork.artworkTitle}`} />
                    <p>{recommendWork.artworkTitle}</p>
                    <p>{recommendWork.artistName}</p>
                    <p>{recommendWork.hashtag}</p>
            </div>
            <div className="comment__wrap">
                댓글
            </div>
        </>
    );

}

export default Artwork;