import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Items from './items';
import '../css/app.css';

const PaginateGet=(props)=> {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [canPrevious, setCanPrevious] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const condition = props.condition;
    const basicUrl = props.url;

    const fetchPost = async (url) => {
        axios.get(url, { params: condition })
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
    }, [condition]);
    const goToPrePage = () => {
        fetchPost(previous);
    }
    const goToNextPage = () => {
        fetchPost(next);
    }
    return (
        <>
            <button className="paginate__btn-pre" onClick={goToPrePage}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </button>
            <ul style={{ display: 'flex', flexWrap:"wrap", justifyContent:"space-around"}}>
                <Items posts={posts} loading={loading} />
            </ul>
            <button className="paginate__btn-next" onClick={ goToNextPage}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </>
        
    );
}

export default PaginateGet;