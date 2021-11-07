import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Items from './items';

const UsualGet = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLodaing] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLodaing(true);
            const res = await axios.get("/artworks/list",{params:{}});
            setPosts(res.data);
            setLodaing(false);
        };
        fetchPosts();
    }, []);
    return (
        <>
            <Items posts={posts} loading={loading} />
        </>
        
    );
};

export default UsualGet;