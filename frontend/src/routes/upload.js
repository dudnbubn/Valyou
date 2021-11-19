import axios from 'axios';
import React, { useEffect, useState} from 'react';
import '../css/upload.css';
const Upload=() => {
    const [uploadCategory, setUploadCategory] = useState('art');
    const [uploadTitle, setUploadTitle] = useState('');
    const [uploadHashtag, setUploadHashtag] = useState('');
    const [uploadHtmlFormal, setUploadHtmlFor] = useState('image/*');
    const [uploadThumbnail, setUploadThumbnail] = useState('');
    const [uploadFile, setUploadFile] = useState('');
    const [uploadIntro, setUploadIntro] = useState('');
    
    const [isuploadCategory, setIsUploadCategory] = useState(false);
    const [isuploadTitle, setIsUploadTitle] = useState(false);
    const [isuploadHashtag, setIsUploadHashtag] = useState(false);
    const [isuploadHtmlFormal, setIsUploadHtmlFor] = useState(false);
    const [isuploadThumbnail, setIsUploadThumbnail] = useState(false);
    const [isuploadFile, setIsUploadFile] = useState(false);
    const [isuploadIntro, setIsUploadIntro] = useState(false);

    const [uploadHashMessage, setUploadHashMessage] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");
    const transformLink = "https://convertio.co/kr/doc-epub/"

    const handleUploadCategory = (e) => {
        setUploadCategory(e.target.value);
        setIsUploadCategory(true);
    }
    const handleUploadTitle = (e) => {
        setUploadTitle(e.target.value);
        setIsUploadTitle(true);
    }
    const handleUploadHashtag = (e) => {
        setUploadHashtag(e.target.value);
        setUploadHashMessage("띄어쓰기로 구분하여 최대 1000자까지 입력 가능");
        setIsUploadHashtag(true);
    }
    const handleUploadHtmlFor = (e) => {
        setUploadHtmlFor(e.target.value);
        if (e.target.value === '.epub') {;
            setUploadMessage('.epub확장자 문서 변환 사이트로 이동');
        } else {
            setUploadMessage('');
        }
        setIsUploadHtmlFor(true);
    }
    const handleUploadThumbnail = (e) => {
        setUploadThumbnail(e.target.value);
        setIsUploadThumbnail(true);
    }
    const handleUploadFile = (e) => {
        // 이미지 불러오는 부분 수정
        setUploadFile(e.target.files[0]);
        setIsUploadFile(true);
    }
    const handleUploadIntro = (e) => {
        setUploadIntro(e.target.value);
        setIsUploadIntro(true);
    }
    const workUploadSubmit = (event) => {
        // 미리 FormData() 객체 생성해서 보낼 데이터들 넣어주기
        let form_data = new FormData();
        form_data.append('category', uploadCategory);
        form_data.append('title', uploadTitle);
        form_data.append('contents', "default");
        form_data.append('description', uploadIntro);
        form_data.append('like_count', "0");
        form_data.append('view_count', "0");
        form_data.append('file_img', uploadFile);
        form_data.append('file_name', "default");
        form_data.append('hashtag', uploadHashtag);
        form_data.append('artist', "2");
        
        // 데이터는 form_data, 헤더에 컨텐츠 타입 수정
        axios.post('api/artworks/', form_data,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        ).then(() => {
            /* 홈화면으로 이동*/
            alert('업로드에 성공하였습니다.');
            window.location.href="/";
        }).catch(error => {
                console.log("upload",error);
            })
    }
    useEffect(() => {
        if (window.sessionStorage.getItem('nickname')!==null) {
            return;
        }
        else {
            alert('로그인을 먼저 해주세요.');
            window.location.href = "/login";
        }
    },[window.sessionStorage.getItem('nickname')])
    return (
        <div className="work_upload">
            <h3 style={{textAlign:"center"}}>작품 올리기</h3>
            <form className="upload_form" onSubmit={ workUploadSubmit}>
                <ul>
                    <li>
                        <fieldset className="choice__category" onChange={handleUploadCategory}>
                            <span className="upload_category">카테고리</span>
                            <input name="category" id="category_art" value="art" type="radio" />
                            <label htmlFor="category_art">미술</label>
                            <input name="category" id="category_music" value="music" type="radio" />
                            <label htmlFor="category_music">음악</label>
                            <input name="category" id="category_writing" value="literal" type="radio" />
                            <label htmlFor ="category_writing">문학</label>
                        </fieldset>
                    </li>
                    <li>
                        <label className="upload__title" htmlFor="work_title">작품명</label>
                        <input type="text" id="work__title" onChange={handleUploadTitle} maxLength='60' />
                    </li>
                    <li>
                        <label className="hashtag" htmlFor="hashtag">해시태그</label>
                        <input type="text" id="hashtag" maxLength='1000' onChange={handleUploadHashtag} />
                        <p style={{color:"red"}}>{uploadHashMessage}</p>
                    </li>
                    <li>
                        <fieldset className="choice__formality"onChange={handleUploadHtmlFor}>
                            <span className="htmlFormality">작품 형식</span>
                            <input name="htmlFormality" id="htmlFormality_art" value="image/*" type="radio" />
                            <label htmlFor="htmlFormality_art">그림</label>
                            <input name="htmlFormality" id="htmlFormality_music" value=".mp4" type="radio" />
                            <label htmlFor="htmlFormality_music">영상(.mp4만 가능)</label>
                            <input name="htmlFormality" id="htmlFormality_writing" value=".epub" type="radio" />
                            <label htmlFor ="htmlFormality_writing">글(.epub만 가능)</label>
                        </fieldset>
                    </li>
                    <li>
                        <label htmlFor="upload__thumbnail">작품 썸네일</label>
                        <input type="file" id="upload__thumbnail" accept=".jpg, .jpeg, .png" onChange={ handleUploadThumbnail}></input>
                    </li>
                    <li>
                        <label className="upload__here" htmlFor="upload_here">작품 업로드</label>
                        <input type="file" id="upload__here" multiple="multiple" accept={uploadHtmlFormal} onChange={handleUploadFile} />
                        <p><a href={transformLink} target="_blank" style={{color:"red"}}>{uploadMessage }</a></p>
                    </li>
                    <li>
                        <label className="work_info" htmlFor="introdcue__work">작품 설명</label>
                        <textarea cols="65" rows="7" id="introduce__work" maxLength="200"
                            placeholder="200자 이내로 작품에 대한 설명을 적어주세요." onChange={handleUploadIntro}></textarea>
                    </li>
                </ul>
                <button className="upload__btn" type="submit"
                    disabled={!(isuploadCategory&&isuploadFile&&isuploadHtmlFormal&&isuploadThumbnail&&isuploadTitle)}
                >업로드하기</button>
            </form>
        </div>
    );
}

export default Upload;