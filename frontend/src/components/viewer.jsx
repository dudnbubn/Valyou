import React, { useRef, useState } from 'react';
//import { EpubViewer, ReactEpubViewer } from 'react-epub-viewer';
import ReactPlayer from 'react-player';
import { ReactReader } from 'react-reader';
const Viewer = (props) => {
    //const viewerRef = useRef(null);
    const [location, setLocation] = useState(null);
    const locationOnChanged = (epubcifi) => {
        setLocation(epubcifi);
    }
    if (props.extension === ".jpeg"
        || props.extension === ".jpg"
        || props.extension === ".png") {
        return (
            <div className={props.className}>
                {   
                    props.files.map(file => {
                        return <img key={file.id} className="artwork__viewer__work" src={file.upload_file} alt={props.title} />
                    })
                }
            </div>
        );
    }
    else if (props.extension === ".mp4") {
        return (
            <div className={props.className}>
                {   
                    props.files.map(file => {
                        return <video key={file.id} className="artwork__viewer__work" src={file.upload_file} alt={props.title} />
                    })
                }
            </div>
        );
    }
    else if (props.extension === ".epub") {
        return (
            <div className={props.className} style={{ position: "relative", height: "100vh" }}>
                {
                    props.files.map(file => {
                        return <ReactReader
                            key={file.id}
                            location={location}
                            locationChanged={locationOnChanged}
                        url={file.upload_file} />
                        //return <EpubViewer ref={viewerRef} key={file.id} className="artwork__viewer__work" url={ file.upload_file} alt={props.title} />
                    })
                }
            </div>
        );
    }
    return <p> loading</p>
    
};

export default Viewer;