import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import '../css/profileArtist.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PaginateGet from '../components/paginateGet';

const ProfileArtist = () => {
    const artistNickname = useParams();
    const [photo, setPhoto] = useState('');
    const [explain, setExplain] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [artworkList, setArtworkList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get('/users', {
            params:
                { nickname: artistNickname }
        }).then((res) => {
            console.log(res.data);
            setPhoto(res.data.img);
            setExplain(res.data.explain);
            setLikeCount(res.data.likeCount);
            setArtworkList(res.data.results);
            setLoading(false);
            
        }).catch(() => {
            setLoading(true);
        })
    }, []);
    
    if (loading == true) {
        return <p>Loading</p>
    }
    else {
        return (
            <>
                <div className="artist_profile">
                    <div className="artist_detail">
                        <div className="artist_img">
                            <img src={photo} alt={artistNickname}></img>
                        </div>
                        <div className="artist_introduce">
                            <p>{artistNickname} </p>
                            <p>{explain}</p>
                        </div>
                    </div>
                    <div className="artist_btn">
                        <button className="like"> 관심{likeCount}</button>
                        <button className="dona">
                            <Link to={`/donation/${artistNickname}`}>후원하기</Link>
                        </button>
                    </div>
                </div>
                <div className="artist_work">
                    
                </div>
            </>
        );
    }
};

    

export default ProfileArtist;