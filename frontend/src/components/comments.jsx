import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/app.css';
import Comment from '../components/comment';

const Comments=(props)=> {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [canPrevious, setCanPrevious] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const basicUrl = props.url;

    const fetchPost = async (url) => {
        axios.get(url)
            .then(res => {
                if (res.data.previous !== null) {
                    setCanPrevious(true);
                    setPrevious('/api/' + res.data.previous.slice(22,));
                } else {
                    setCanPrevious(false);
                }
                if (res.data.next !== null) {
                    setCanNext(true);
                    setNext('/api/' + res.data.next.slice(22,));
                    
                } else {
                    setCanNext(false);
                }
                setPosts(res.data.results);
                setLoading(false);
            }).catch(error => {
                console.log(error);
            })
    };
    useEffect(() => {
        fetchPost(basicUrl);
    }, []);
    const goToPrePage = () => {
        if (canPrevious === true) {
            fetchPost(previous);
        }
        /*console.log(canPrevious, canNext);
        let preContainer = document.querySelector('.paginate__btn-pre');
        if (canPrevious === false) {
            preContainer.style.color ="#d3d3d3";
        } else {
            preContainer.style.color = "#650689";
        }*/
    }
    const goToNextPage = () => {
        if (canNext === true) {
            fetchPost(next);
        }
        /*let nextContainer = document.querySelector('.paginate__btn-next');
        if (canNext === false) {
            nextContainer.style.color = "#d3d3d3";
        } else {
            nextContainer.style.color = "#650689";
        }*/
    }
    return (
        <div className={ props.name}>
            <ul className ="artwork__comments">{
                <Comment posts={posts} loading={loading}/>
            }</ul>
            <div className="pagination__btns" style={{display:"flex", justifyContent:"center"}}>
                <button className="paginate__btn-pre" onClick={goToPrePage}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </button>
                <button className="paginate__btn-next" onClick={ goToNextPage}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
            
        </div>
        
    );
}

export default Comments;