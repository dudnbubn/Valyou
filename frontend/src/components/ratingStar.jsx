import React, { useMemo, useState, useEffect } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const RatingStart = (props) => {
    const [rating, setRating] = useState(6);
    const [hoverRating, setHoverRating] = useState(6);

    const ratingContainer = document.querySelector(`.${props.name}`);
    const mouseUp = (e) => {
        const value = e.target.dataset.value;
        if (value !== undefined && rating===6) {
            for (let i = 0; i < value; i++){
                setHoverRating(value);
                ratingContainer.children[i].children[0].style.color = "#ffdb58";
            }
        }
    }
    const mouseDown = (e) => {
        if (rating===6) {
            for (let i = 0; i < 5; i++){
                setHoverRating(6);
                ratingContainer.children[i].children[0].style.color = "#656565";
            }
        }
    }
    const mouseSet = (e) => {
        if (window.sessionStorage.getItem('nickname') !== null) {
            if (hoverRating>0&&hoverRating<6 && rating === 6) {
                setRating(hoverRating);
                axios.post('', {
                    "artworkId": props.artworkId,
                    "rating":rating
                }).then(res => {
                    
                }).catch(error => {
                    console.log(error);
                })
            }
        } else {
            alert('로그인이 필요한 작업입니다.');
            window.location.href = "/login";
        }
    }
    return (
        <ul className={ props.name} onMouseEnter={mouseUp} onMouseLeave={ mouseDown}
            onClick={mouseSet} data-value={0}>
            <li data-value={1}>
                <FontAwesomeIcon icon={faStar} data-value={1} style={{ marginRight: "3px", color: "#656565" }} />
            </li>
            <li data-value={2}>
                <FontAwesomeIcon icon={faStar} data-value={2} style={{ marginRight: "3px", color: "#656565" }} />
            </li>
            <li data-value={3}>
                <FontAwesomeIcon icon={faStar} data-value={3} style={{ marginRight: "3px", color: "#656565" }} />
            </li>
            <li data-value={4}>
                <FontAwesomeIcon icon={faStar} data-value={4} style={{ marginRight: "3px", color: "#656565" }} />
            </li>
            <li data-value={5}>
                <FontAwesomeIcon icon={faStar} data-value={5} style={{ marginRight: "3px", color: "#656565" }} />
            </li>
        </ul>
    );
};

export default RatingStart;