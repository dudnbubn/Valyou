import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Items from './items';
import Pagination from './pagination';

const Posts=()=> {
    const [posts, setPosts] = useState([]);
    const [loading, setLodaing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        const fetchPosts = async () => {
            setLodaing(true);
            const res = await axios.get("/artworks/list");
            setPosts(res.data);
            setLodaing(false);
        };
        fetchPosts();
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Items posts={currentPosts} loading={loading} />
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate ={paginate} />
        </>
        
    );
    
}

export default Posts;