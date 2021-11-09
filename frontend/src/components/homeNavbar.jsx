import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';

class HomeNavbar extends PureComponent {
    onLevel = (event) => {
        this.props.onLevel(event.target);
    }
    render() {
        return (
            <Link to="/">
                <ul className="levels">
                    <li className="level__btn active" id="default_level"data-value="pro" onClick={this.onLevel}>
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