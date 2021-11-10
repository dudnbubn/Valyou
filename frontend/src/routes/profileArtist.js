import React, { Component } from 'react';
import axios from 'axios';
import Items from '../components/items';
import '../css/profileArtist.css';

class ProfileArtist extends Component {
    state = {
        artistId: "21",
        artistItems: [],
    }
    componentDidMount(artistId) {
        const artistIg = axios.get('', {
            params: {
                userId: artistId,
            }
        });
        this.setState({ artistItems: artistIg });
    }
    render() {
        return (
            <>
                <div className="artist_profile">
                    <div className="artist_detail">
                        <div className="artist_img">
                            <img src={this.state.artistItems.artistImg} alt={this.state.artistItems.artistName}></img>
                        </div>
                        <div className="artist_introduce">
                            <p>{this.state.artistItems.artistName} </p>
                            <p>{this.state.artistItems.artistIntroduce}</p>
                        </div>
                    </div>
                    <div className="artist_btn">
                        <button className="like"> 관심{ this.state.artistItems.like}</button>
                        <button className="dona"> 후원하기 </button>
                    </div>
                </div>
                <div className="artist_work">
                    {
                        <Items posts={this.state.artistItems.artWork} loading="true" />
                    }
                </div>
            </>
        );
    }
}

export default ProfileArtist;