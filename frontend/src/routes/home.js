import React, { Component } from 'react';
import '../css/home.css';
import UsualGet from '../components/usualGet';
import PaginateGet from '../components/paginateGet';
import PaginateGet2 from '../components/paginateGet2';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommend: 5,
            popular:[],
        }
    }
    checkCategory = (event) => {
        this.props.onCategory(event.target);
    }
    checkStandard = (event) => {
        this.props.onSort(event.target);
    }
    activateTab = () => {
        const containerC = document.querySelector('.category__btn.active');
        containerC.classList.remove('active');
        const containerS = document.querySelector('.sort__btn.active');
        containerS.classList.remove('active');
        const changeContainerC = document.querySelector(`#${this.props.items.category}`);
        changeContainerC.classList.add('active');
        const changeContainerS = document.querySelector(`#${this.props.items.sort}`);
        changeContainerS.classList.add('active');
    }
    
    componentDidUpdate = () => {
        this.activateTab();
    }
    render() {
        return (
            <>
                <div className="recommend__wrap">
                    <p className="recommend__title">이런 작품은 어떠세요?</p>
                    <PaginateGet condition={{
                            level: this.props.items.level,
                        }}
                        url={"/api/artworks/recommend"}
                        name="home__recommend"
                    />
                </div>
                <div className="container">
                    <div className="contents__wrap">
                        <ul className="categories" onClick={this.activateCategory}>
                            <li className="category__btn active"id="art" data-value="art" onClick={ this.checkCategory }>미술</li>
                            <li className="category__btn" id ="music" data-value="music" onClick={ this.checkCategory }>음악</li>
                            <li className="category__btn" id ="literal" data-value="literal" onClick={ this.checkCategory }>문학</li>
                        </ul>
                        <div className="contents">
                            <ul className="contents__sort" onClick={this.activateSort}>
                                <li className="sort__btn active" id="latest" data-value="latest" onClick={ this.checkStandard }>신작순</li>
                                <li className="sort__btn" id="popular" data-value="popular" onClick={this.checkStandard}>인기순</li>
                            </ul>
                            <PaginateGet2 condition={{
                                level: this.props.items.level,
                                category: this.props.items.category,
                                order: this.props.items.sort
                            }}
                                url={"/api/artworks/list"}
                                name="home__main"
                            />
                        </div>
                    </div>
                    <div className="levels__top5">
                        <h3 style={{textAlign:"center"}}>{this.props.items.level}의 인기작품</h3>
                        <UsualGet condition={{
                                level: this.props.items.level,
                                order: "popular"
                            }}
                            url={"/api/artworks/popular"}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default Home;