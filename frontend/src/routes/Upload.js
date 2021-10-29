import React from "react";
import "../css/Upload.css";

class Upload extends React.Component {
    render() {
        return (
            <div className="main__wrap">
                <div className="work_upload">
                    <h3 style={{textAlign:"center"}}>작품 올리기</h3>
                    <form className="upload_form">
                        <ul>
                            <li>
                                <fieldset>
                                    <span className="upload_category">카테고리</span>
                                    <label className="category_art">미술</label>
                                    <input className="category_art_btn" name="category_art" type="radio" />
                                    <label className="category_music">음악</label>
                                    <input className="category_music_btn" name="category_music" type="radio" />
                                    <label className ="category_writing">문학</label>
                                    <input className="category_writing_btn" name="category_writing" type="radio" />
                                </fieldset>
                            </li>
                            <li>
                                <label className="name" for="work_name">작품명</label>
                                <input type="text" id="work_name" />
                            </li>
                            <li>
                                <label className="hashtag" for="hashtag">해시태그</label>
                                <input type="text" id="hashtag" />
                            </li>
                            <li>
                                <fieldset>
                                    <span className="formality">작품 형식</span>
                                    <label className="formality_art">그림</label>
                                    <input className="formality_art_btn" name="formality_art" type="radio" />
                                    <label className="formality_music">영상</label>
                                    <input className="formality_music_btn" name="formality_music" type="radio" />
                                    <label className ="formality_writing">글</label>
                                    <input className="formality_writing_btn" name="formality_writing" type="radio" />
                                </fieldset>
                            </li>
                            <li>
                                <label className="upload_here" for="upload_here">작품 업로드</label>
                                <input type="file" id="upload_here" />
                            </li>
                            <li>
                                <label className="work_info" for="introdcue_work">작품 설명</label>
                                <textarea cols="65" rows="7" id="introdcue_work"
                                    placeholder="작품에 대한 설명을 적어주세요."></textarea>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );    
    }
}

export default Upload;