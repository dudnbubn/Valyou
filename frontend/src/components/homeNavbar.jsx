import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';

class HomeNavbar extends PureComponent {
    onLevel = (event) => {
        this.props.onLevel(event.target.dataset.value);
    }
    activateLevel = (event) => {
        const container = document.querySelector('.level__btn.active');
        container.classList.remove('active');
        event.target.classList.add('active');
    }
    render() {
        return (
            <Link to="/">
                <ul className="levels" onClick={this.activateLevel}>
                    <li className="level__btn active" data-value="pro" onClick={this.onLevel}>
                        Professional
                    </li>
                    <li className="level__btn" data-value="adv" onClick={this.onLevel}>
                        Advanced
                    </li>
                    <li className="level__btn" data-value="nov" onClick={this.onLevel}>
                        Novice
                    </li>
                </ul>
            </Link>
            
        );
    }
}

export default HomeNavbar;