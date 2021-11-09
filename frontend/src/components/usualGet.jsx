import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Items from './items';

const UsualGet = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const condition = props.condition;
    
    useEffect(() => {
        axios.get("/api/artworks/list", { params: condition })
            .then(res => {
            console.log("usualGet", res.data);
            setPosts(res.data.results);
                setLoading(false);
            }).catch(error => {
                console.log("usualGet",error);
        })
    },[condition]);

    return (
        <Items posts={posts} loading={loading} />
    )
};

export default UsualGet;