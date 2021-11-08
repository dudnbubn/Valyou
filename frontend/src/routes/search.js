import axios from 'axios';
import React, { Component } from 'react';
import '../css/search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword:"",
            works: [],
            workPro: [],
            workAdv: [],
            workNov: [],
            loading: false
        }
    }
    loadItems=()=> {
        const works = axios.get('', {
            params: {
                result: this.state.keyword,
            }
        });
        this.setState({ works });
    };

    sorting = () => {
        const workP = [...this.state.workPro ];
        const workA = [ ...this.state.workAdv ];
        const workN = [ ...this.state.workNov ];
        this.state.works.map(work => {
            if (work.level === "pro") {
                workP.push(work);
            } else if (work.level === "adv") {
                workA.push(work);
            } else if (work.level === "nov") {
                workN.push(work);
            }
        })
        this.setState({ workPro: workP, workAdv: workA, workNov: workN });
        this.setState({ loading: true });
    };
    render() {
        return (
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
        );    
    }
}

export default Search;