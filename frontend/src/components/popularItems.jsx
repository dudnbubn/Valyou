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
                    <li key={ post.id} className="artwork" style={{width:"250px", height:"100px", padding:"10px 15px", margin:"0"}}>
                        <Link to={{
                            pathname: `/artwork/${post.id}`,
                            state: { artworkId: post.id }
                        }}
                            style={{width:"200px", height:"70px",display:"flex",flexDirection:"row"}}
                        >
                            <img className="artwork__img" src={post.thumbnail_img} alt={post.title}
                                style={{width:"70px", height:"70px", display:"block", marginRight:"5px"}}/>
                            <div style={{width:"120px", height:"70px", display:"block"}}>
                                <p className="artwork__work__title">{post.title}</p>
                                <p className="artwork__artist__title">{post.artist.nickname}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </> 
        );
    }
};

export default PopularItems;