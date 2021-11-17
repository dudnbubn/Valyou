import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Items from './items';
import PopularItems from "./popularItems";

const UsualGet = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const condition = props.condition;
    const count = props.count;
    const url = props.url;
    useEffect(() => {
        axios.get(url, { params: condition })
            .then(res => {
                console.log("usualGet", res.data);
                setPosts(res.data.results);
                setLoading(false);
            }).catch(error => {
                console.log("usualGet",error);
        })
    }, [condition]);
    

    return (
        <ul>
            <PopularItems posts={posts.slice(count)} loading={loading} />
        </ul>
    )
};

export default UsualGet;