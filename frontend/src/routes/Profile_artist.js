import React from "react";
import "../css/Profile_artist.css";

function Profile_artist() {
    return (
        <div className="main__wrap">
            <div className="artist_profile">
                <div className="artist_detail">
                    <div className="artist_img">
                        
                    </div>
                    <div className="artist_introduce">

                    </div>
                </div>
                <div className="artist_btn">
                    <button className="like"> 관심</button>
                    <button className="dona"> 후원하기 </button>
                </div>
            </div>
            <div className="artist_work">

            </div>

        </div>
    );
}

export default Profile_artist;