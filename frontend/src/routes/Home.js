import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaginateGet from '../components/paginateGet';
import UsualGet from '../components/usualGet';
import '../css/home.css';
class Home extends Component {

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
    render(props) {
        const artworkId = 2;
        return (
            <>
                <div className="recommend__wrap">
                    <PaginateGet data-type="recommend" />
                    <Link to={`/artwork/${artworkId}`}>링크</Link>
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
                            <UsualGet data-type="main" data-level={this.props.level} data-category={this.props.category} data-sort={this.props.sort}/>
                        </div>
                    </div>
                    <div className="levels__top5">
                        <UsualGet data-type="hot" data-level={this.props.level} data-sort={"popular"}/>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;