import axios from 'axios';
import React, { Component } from 'react';
import Items from '../components/items';
import '../css/search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword:"",
            workPro: [],
            workAdv: [],
            workNov: [],
            loading: false
        }
    }
    loadItems=()=> {
        axios.get('/artworks/search', {
            params: {
                level: "pro",
                query: this.state.keyword,
            }
        }).then(res => {
            this.setState({ workPro: res.data })
        }).catch(() => {
            this.setState({ loading: false })
        });
        axios.get('/artworks/search', {
            params: {
                level: "adv",
                query: this.state.keyword,
            }
        }).then(res => {
            this.setState({ workAdv:res.data })
        }).catch(() => {
            this.setState({ loading: false })
        });
        axios.get('/artworks/search', {
            params: {
                level: "Nov",
                query: this.state.keyword,
            }
        }).then(res => {
            this.setState({ workNov: res.data })
        }).catch(() => {
            this.setState({ loading: false })
        });
    };
    render() {
        return (
            <div className="searching_result">
                <h3>검색결과</h3>
                <div className="professional_search">
                    <h4>Professional 검색결과</h4>
                    <ul className="professional_search_list">
                        <Items posts={ this.state.workPro} loading={this.state.loading} />
                    </ul>
                    <a className="result_more" href="#">더보기</a>
                </div>
                <div className="advanced_search">
                    <h4>Advanced 검색결과</h4>
                    <ul className="advanced_search_list">
                        <Items posts={ this.state.workAdv} loading={this.state.loading} />
                    </ul>
                    <a className="result_more" href="#">더보기</a>
                </div>
                <div className="novice_search">
                    <h4>Novice 검색결과</h4>
                    <ul className="advanced_search_list">
                        <Items posts={ this.state.workNov} loading={this.state.loading} />
                    </ul>
                    <a className="result_more" href="#">더보기</a>
                </div>
            </div>
        );    
    }
}

export default Search;