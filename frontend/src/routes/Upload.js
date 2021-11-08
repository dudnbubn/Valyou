import axios from 'axios';
import React, { useState} from 'react';
import '../css/upload.css';
const Upload=() => {
    if (sessionStorage.getItem('userId') === null) {
            alert('로그인부터 해주세요!')
        }
    const [uploadCategory, setUploadCategory] = useState('art');
    const [uploadTitle, setUploadTitle] = useState('');
    const [uploadHashtag, setUploadHashtag] = useState('');
    const [uploadHtmlFormal, setUploadHtmlFor] = useState('image/*');
    const [uploadThumbnail, setUploadThumbnail] = useState('');
    const [uploadFile, setUploadFile] = useState('');
    const [uploadIntro, setUploadIntro] = useState('');
    
    const handleUploadCategory = (e) => {
        setUploadCategory(e.target.value)
    }
    const handleUploadTitle = (e) => {
        setUploadTitle(e.target.value)
    }
    const handleUploadHashtag = (e) => {
        setUploadHashtag(e.target.value)
    }
    const handleUploadHtmlFor = (e) => {
        setUploadHtmlFor(e.target.value)
    }
    const handleUploadThumbnail = (e) => {
        setUploadThumbnail(e.target.value)
    }
    const handleUploadFile = (e) => {
        setUploadFile(e.target.value)
    }
    const handleUploadIntro = (e) => {
        setUploadIntro(e.target.value)
    }
    const workUploadSubmit = (event) => {
        event.preventDefault();
        console.log(uploadCategory );
        console.log(uploadTitle);
        console.log(uploadHashtag);
        console.log(uploadHtmlFormal);
        console.log(uploadThumbnail);
        console.log(uploadFile);
        console.log(uploadIntro);
        axios.post('/api/artwork', null, {
            params: {
                userId:sessionStorage.getItem('userId'),
                category: uploadCategory,
                thumbnail: uploadThumbnail,
                artworkTitle: uploadTitle,
                hashtag: uploadHashtag,
                artwork: uploadFile,
                artworkExplain: uploadIntro
            }
        }).then(()=>{
            /* 홈화면으로 이동*/
            alert('업로드에 성공하였습니다.');
        }).catch()
    }
    
    return (
        <div className="work_upload">
            <h3 style={{textAlign:"center"}}>작품 올리기</h3>
            <form className="upload_htmlForm" onSubmit={ workUploadSubmit}>
                <ul>
                    <li>
                        <fieldset onChange={handleUploadCategory}>
                            <span className="upload_category">카테고리</span>
                            <input name="category" id="category_art" valut="art" type="radio" />
                            <label htmlFor="category_art">미술</label>
                            <input name="category" id="category_music" value="music" type="radio" />
                            <label htmlFor="category_music">음악</label>
                            <input name="category" id="category_writing" value="literal" type="radio" />
                            <label htmlFor ="category_writing">문학</label>
                        </fieldset>
                    </li>
                    <li>
                        <label className="title" htmlFor="work_title">작품명</label>
                        <input type="text" id="work_title" onChange={handleUploadTitle} />
                    </li>
                    <li>
                        <label className="hashtag" htmlFor="hashtag">해시태그</label>
                        <input type="text" id="hashtag" onChange={handleUploadHashtag} />
                    </li>
                    <li>
                        <fieldset onChange={handleUploadHtmlFor}>
                            <span className="htmlFormality">작품 형식</span>
                            <input name="htmlFormality" id="htmlFormality_art" value="image/*" type="radio" />
                            <label htmlFor="htmlFormality_art">그림</label>
                            <input name="htmlFormality" id="htmlFormality_music" value="video/*" type="radio" />
                            <label htmlFor="htmlFormality_music">영상</label>
                            <input name="htmlFormality" id="htmlFormality_writing" value=".doc" type="radio" />
                            <label htmlFor ="htmlFormality_writing">글</label>
                        </fieldset>
                    </li>
                    <li>
                        <label htmlFor="thumbnail">작품 썸네일</label>
                        <input type="file" id ="thumbnail" accept=".jpg, .jpeg, .png"></input>
                    </li>
                    <li>
                        <label className="upload_here" htmlFor="upload_here">작품 업로드</label>
                        <input type="file" id="upload_here" multiple="multiple" accept={uploadHtmlFormal } onChange={handleUploadFile} />
                    </li>
                    <li>
                        <label className="work_info" htmlFor="introdcue_work">작품 설명</label>
                        <textarea cols="65" rows="7" id="introdcue_work"
                            placeholder="작품에 대한 설명을 적어주세요." onChange={handleUploadIntro}></textarea>
                    </li>
                </ul>
                <button type="submit">업로드하기</button>
            </form>
        </div>
    );
}

export default Upload;