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
        this.props.onCategory(event.target.dataset.value);
    }
    checkStandard = (event) => {
        this.props.onSort(event.target.dataset.value);
    }
    activateCategory = (event) => {
        const container = document.querySelector('.category__btn.active');
        container.classList.remove('active');
        event.target.classList.add('active');
    }
    activateSort = (event) => {
        const container = document.querySelector('.sort__btn.active');
        container.classList.remove('active');
        event.target.classList.add('active');
    }
    componentDidMount = () => {
        const res = axios.get('/artworks/popular');
        console.log(res.data);
        this.setState({ popular: res.data });
    }
    
    render(props) {
        return (
            <>
                <div className="recommend__wrap">

                </div>
                <div className="container">
                    <div className="contents__wrap">
                        <ul className="categories" onClick={ this.activateCategory}>
                            <li className="category__btn active" data-value="music" onClick={ this.checkCategory }>음악</li>
                            <li className="category__btn" data-value="literal" onClick={ this.checkCategory }>문학</li>
                            <li className="category__btn" data-value="art" onClick={ this.checkCategory }>미술</li>
                        </ul>
                        <div className="contents">
                            <ul className="contents__sort" onClick={this.activateSort}>
                                <li className="sort__btn active" data-value="latest" onClick={ this.checkStandard }>신작순</li>
                                <li className="sort__btn" data-value="popular" onClick={this.checkStandard}>인기순</li>
                            </ul>
                            <UsualGet condition={
                                {
                                    level: this.props.items.level,
                                    category: this.props.items.category,
                                    order: this.props.items.sort
                                }
                            } />
                        </div>
                    </div>
                    <div className="levels__top5">
                        <Items posts={ this.state.popular} loading={true} />
                    </div>
                </div>
            </>
        );
    }
}

export default Home;