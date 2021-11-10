import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
const Artwork = ({ location }) => {
    const artworkId = useParams().artworkId;

    const [work, setWork] = useState([]);
    const [recommendWork, setRecommendWork] = useState([]);

    useEffect(() => {
        const url = '/api/artworks/' + artworkId + "/";
        axios.get(url)
            .then(res => {
                setWork(res.data);
            }).catch(error => {
                console.log("artwork.js", error);
            });
        axios.get("/api/artworks/", { params: { id:artworkId } })
            .then(res => {
                setRecommendWork(res.data);
            }).catch(error => {
                console.log("artwork.js recommend", error);
            });
    },[]);
    return (
        <>
            <div className="work_name">
                <p>{work.title}</p>
            </div>
            <div className="work">
                <img src={work.file_img} alt={work.title}/>
            </div>
            <div className="work_information">
                { work.description}
            </div>
            <div className="artist_information">
                {work.artist_nickname}
            </div>
            <button className="artist__info__btn">
                <Link to={`/artist_profile/${work.artist_nickname}`}>이 작가의 다른 작품 더보기</Link>
            </button>
            <div className="sponsor">
                {/*{work.sponsor.map(people => {
                    <li>{ people}</li>
                })}*/}
            </div>
            <div className="btn_w">
                <button className="work_like">좋아요 { work.like_count}</button>
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