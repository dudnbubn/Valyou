import React, { useRef } from 'react';
import { EpubViewer, ReactEpubViewer } from 'react-epub-viewer';
import ReactPlayer from 'react-player';

const Viewer = (props) => {
    const viewerRef = useRef();
    
    if (props.extension === ".jpeg"
        || props.extension === ".jpg"
        || props.extension === ".png") {
        return <img className="artwork__viewer__work" src={props.files} alt={props.title} />
        /*return props.files.map(file => {
            <img className="artwork__viewer__work" src={file} alt={props.title} />
        })*/
    }
    else if (props.extension === ".mp4") {
        return <ReactPlayer url={props.files} alt={props.title} />
        /*return props.files.map(file => {
            <ReactPlayer url={ file} alt={props.title} />
        })*/
    }
    else if (props.extension === ".epub") {
        return <ReactEpubViewer url={props.files} ref={viewerRef}/>
        /*return props.files.map(file => {
            <ReactEpubViewer url={ file} ref={viewerRef}/>
        })*/
    }
    return <p> loading</p>
    
};

export default Viewer;