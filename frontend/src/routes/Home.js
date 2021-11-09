import React, { Component } from 'react';
import axios from'axios';
import { Link } from 'react-router-dom';
import '../css/home.css';
import UsualGet from '../components/usualGet';
import Items from '../components/items';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommend: [],
            popular:[],
        }
    }
    checkCategory = (event) => {
        this.props.onCategory(event.target);
    }
    checkStandard = (event) => {
        this.props.onSort(event.target);
    }
    
    //인기 level5's artworks get
    componentDidMount = () => {
        axios.get('/artworks/list', {
            params: {
                level: this.props.items.level,
                category: this.props.items.category,
                order:"popular"
            }
        }).then(res => {
                this.setState({ popular: res.data.results });
            }).catch(error => {
                console.log("componentDidMount", error);
            });
    }
    
    render() {
        return (
            <>
                <div className="recommend__wrap">

                </div>
                <div className="container">
                    <div className="contents__wrap">
                        <ul className="categories" onClick={this.activateCategory}>
                            <li className="category__btn active"id="default_category" data-value="art" onClick={ this.checkCategory }>미술</li>
                            <li className="category__btn" data-value="music" onClick={ this.checkCategory }>음악</li>
                            <li className="category__btn" data-value="literal" onClick={ this.checkCategory }>문학</li>
                        </ul>
                        <div className="contents">
                            <ul className="contents__sort" onClick={this.activateSort}>
                                <li className="sort__btn active" id="default_sort" data-value="latest" onClick={ this.checkStandard }>신작순</li>
                                <li className="sort__btn" data-value="popular" onClick={this.checkStandard}>인기순</li>
                            </ul>
                            <ul className="contents__artworks">
                                <UsualGet condition={
                                {
                                    level: this.props.items.level,
                                    category: this.props.items.category,
                                    order: this.props.items.sort
                                }
                            } />
                            </ul>  
                        </div>
                    </div>
                    <div className="levels__top5">
                        <ul>
                            <UsualGet condition={
                            {
                                level: this.props.items.level,
                                category: this.props.items.category,
                                order: "popular"
                            }
                        } />
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;