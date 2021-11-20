import React from 'react';

const Items = ({ posts, loading }) => {
    if (loading) {
        return <h2>Loading</h2>;
    }
    else {
        
        console.log(posts);
        return (
            <>
                {posts.map((post) => (
                    <li key={ post.id} className="comment_userNickname">
                        <p>{post.id}</p>
                        <p>{post.comment}</p>
                    </li>
                ))}
            </> 
        );
    }
};

export default Items;