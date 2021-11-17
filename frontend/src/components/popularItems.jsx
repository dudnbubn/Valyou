import React from 'react';
import { Link } from 'react-router-dom';
const PopularItems = ({ posts, loading }) => {
    if (loading) {
        return <h2>Loading</h2>;
    }
    else {
        return (
            <>
                {posts.map((post) => (
                    <li key={ post.id} className="artwork">
                        <Link to={{
                            pathname: `/artwork/${post.id}`,
                            state: { artworkId: post.id }
                        }}>
                            <p className="artwork__work__title">{post.title}</p>
                            <p className="artwork__artist__title">{post.artist.nickname}</p>
                        </Link>
                    </li>
                ))}
            </> 
        );
    }
};

export default PopularItems;