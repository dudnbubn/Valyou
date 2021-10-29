import React from "react";
import "../css/Search_result.css";

class Search_result extends React.Component {
    render() {
        return (
        <div className="main__wrap">
            <div className="searching_result">
                <h3>검색결과</h3>
                <div className="professional_search">
                    <h4>Professional 검색결과</h4>
                    <ul className="professional_search_list">

                    </ul>
                    <a className="result_more" href="#">더보기</a>
                </div>
                <div className="advanced_search">
                    <h4>Advanced 검색결과</h4>
                    <ul className="advanced_search_list">

                    </ul>
                    <a className="result_more" href="#">더보기</a>
                </div>
                <div className="novice_search">
                    <h4>Novice 검색결과</h4>
                    <ul className="novice_search_list">

                    </ul>
                    <a className="result_more" href="#">더보기</a>
                </div>
            </div>
        </div>
    );
    }
}

export default Search_result;