import React from "react";
import axios from "axios";
import "../css/Home.css";

class Home extends React.Component {
    state = {
        level: "pro",
        category: "art",
        standard: "new"
    };
    paintItems(items) {
        console.log(items);
        const container = document.querySelector('.contents__list');
        for (let i = 0; i < items.length-1; i++){
            container.insertAdjacentHTML('beforeend',
                `<li>
                    <div class="artwork">
                        <img class="artwork__img"src="https://cdn.pixabay.com/photo/2016/10/09/17/27/fake-1726362_1280.jpg" alt=${items[i].title} />
                        <p class="artwork__work__title">${items[i].name}</p>
                        <p class="artwork__artist__title">${items[i].email}</p>
                    </div>
                </li>`
            )
        }
    };

    loaditems(state) {
        console.log(this.state);
        const { items } = axios.get('https://jsonplaceholder.typicode.com/comments?postId=1',
            { params: { level: state.level, category: state.category, standard: state.standard } })
            .then(response => {
                this.paintItems(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    checkCategory(params) {
        return this.setState({ category: params }, () => this.loaditems(this.state))
    }
    checkStandard(params) {
        return this.setState({ standard: params }, () => this.loaditems(this.state))
    }
    componentDidMount() {
        this.loaditems(this.state);
    };
    render() {
        return (
            <div className="main__wrap">
                <div className="recommend__wrap">
                    recommend
                </div>
                <div className="container">
                    <div className="contents__wrap">
                        <ul className="categories">
                            <li onClick={() => { this.checkCategory("art") }}>미술</li>
                            <li onClick={() => { this.checkCategory("music") }}>음악</li>
                            <li onClick={() => { this.checkCategory("literal") }}>문학</li>
                        </ul>
                        <div className="contents">
                            <ul className="contents__sort">
                                <li onClick={() => { this.checkStandard("new") }}>신작순</li>
                                <li onClick={()=>{this.checkStandard("popular")}}>인기순</li>
                            </ul>
                            <ul className="contents__list">
                                
                            </ul>
                        </div>
                    </div>
                    <div className="levels__top5">
                        levels top5
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;