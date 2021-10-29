import React from "react";
import "../css/Artwork.css";

class Artwork extends React.Component{

    render() {
        return (
        <div className="main__wrap">
            <div className="work_name">
                작품명
            </div>
            <div className="work">
                작품
            </div>
            <div className="work_information">
                작품 설명
            </div>
            <div className="artist_information">
                예술가 설명
            </div>
            <div className="sponsor">
                후원인단
            </div>
            <div className="btn_w">
                <button className="work_like">좋아요</button>
                <button className="work_report">신고</button>
            </div>
            <div className="related_work_recommendation">
                관련 작품 추천
            </div>
            <div className="comment__wrap">
                댓글
            </div>
        </div>
    );
    }
    

}

export default Artwork;