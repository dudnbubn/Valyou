import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import '../css/profileArtist.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/profileArtist.css';
import PaginateGet2 from '../components/paginateGet2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProfileArtist = () => {
    const artistNickname = useParams().artistNickname;

    const [photo, setPhoto] = useState('');
    const [explain, setExplain] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    
    useEffect(() => {

        axios.get('/api/users/artist', {
            params:
                { nickname: artistNickname }
        }).then((res) => {
            setPhoto(res.data.results[0].artist_img);
            setExplain(res.data.explain);
            setLikeCount(res.data.likeCount);
            
        }).catch((error) => {
            console.log(error);
        })
    }, [likeCount]);
    const pushLikeArtist = () => {
        axios.post('', {
            
        }).then(() => {
            let changeCount = likeCount + 1;
            setLikeCount({ changeCount });
            
        }).catch(error => {
            console.log(error);
        })
    }
    
    return (
        <>
            <div className="artist_profile">
                <div className="artist_detail">
                    <div className="artist_img_wrap">
                        <img className="artist_img"src={photo} alt={artistNickname}></img>
                    </div>
                    <div className="artist_introduce">
                        <p>{artistNickname} </p>
                        <p>{ explain}</p>
                    </div>
                </div>
                <div className="artist_btn">
                    <button className="like" onClick={pushLikeArtist}> 관심 </button>
                    <Link to={`/donation/${artistNickname}`}>
                        <button className="dona">후원하기</button>
                    </Link>
                    
                </div>
            </div>
            <div className="artist_work">
                <PaginateGet2 condition={{
                    nickname : artistNickname
                }}
                url={"/api/artworks/byartist"}
                name="artistProfile__artworks"
                />
            </div>
        </>
    );
    
};

    

export default ProfileArtist;