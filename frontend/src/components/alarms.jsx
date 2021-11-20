import React from 'react';
import { Link } from 'react-router-dom';

const Alarms = ({ loading, posts }) => {
    if (loading) {
        return <h2>Loading</h2>;
    }
    else {
        return (
            <>
                {posts.map((post) => (
                    <li key={post.id} className="artwork">
                        <Link to={{
                            pathname: `/artwork/${post.id}`,
                            state: { artworkId: post.id }
                        }}>
                            <img className="alarm__artwork__img" src={post.file_img} alt={post.title} />
                            <div className="alarm__detail">
                                <p>{post.artist.nickname}의 신작, {post.title}이 업로드 되었습니다.</p>
                                <p>{post.hashtag}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </>
        );
    }
};

export default Alarms;