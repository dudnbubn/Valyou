import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Items from './items';

const UsualGet = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLodaing] = useState(false);
    const condition = props.condition;
    
    axios.get("/artworks/list", {
        params: condition
    }).then(res => {
        setPosts(res.data);
        setLodaing(true);
    })

    return (
        <Items posts={posts} loading={loading} />    
    );
};

export default UsualGet;