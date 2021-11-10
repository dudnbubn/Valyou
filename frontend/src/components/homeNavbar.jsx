import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';

class HomeNavbar extends PureComponent {
    onLevel = (event) => {
        this.props.onLevel(event.target);
    }
    activateTab = () => {
        const containerL = document.querySelector('.level__btn.active');
        containerL.classList.remove('active');
        const changeContainerL = document.querySelector(`#${this.props.items.level}`);
        changeContainerL.classList.add('active');
        console.log(changeContainerL);
    }
    componentDidUpdate = () => {
        this.activateTab();
    }
    render() {
        console.log("navbar");
        return (
            <Link to="/">
                <ul className="levels">
                    <li className="level__btn active" id="pro"data-value="pro" onClick={this.onLevel}>
                        Professional
                    </li>
                    <li className="level__btn" id ="adv" data-value="adv" onClick={this.onLevel}>
                        Advanced
                    </li>
                    <li className="level__btn" id="nov" data-value="nov" onClick={this.onLevel}>
                        Novice
                    </li>
                </ul>
            </Link>
            
        );
    }
}

export default HomeNavbar;