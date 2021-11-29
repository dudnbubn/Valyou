import React from 'react';
import { Link } from 'react-router-dom';
const Items = ({ posts, loading }) => {
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
                            <img className="artwork__img"src={post.thumbnail_img} alt={post.title}/>
                            <p className="artwork__work__title">{post.title}</p>
                            <p className="artwork__artist__title">{post.artist.nickname}</p>
                            <p className="artwork__hashtag">{post.hashtag}</p>
                        </Link>
                    </li>
                ))}
            </> 
        );
    }
};

export default Items;