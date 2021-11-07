import React from 'react';
import { Link } from 'react-router-dom';
const items = ({ posts, loading }) => {
    if (loading) {
        return <h2>Loding</h2>;
    }
    else {
        return (
            <>
                {posts.map((post) => (
                    <li>
                        <Link to={{
                            pathname: "/artwork",
                            state: { artworkId: post.artworkId }
                        }}>
                            <img src={post.thumbnail} alt={post.artworkTitle, post.artistName} />
                            <p>{post.artworkTitle}</p>
                            <p>{post.artistName}</p>
                            <p>{post.hashtag}</p>
                        </Link>
                    </li>
                ))}
            </> 
        );
    }
};

export default items;