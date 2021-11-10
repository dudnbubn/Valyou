import React, { Component } from 'react';
import '../css/donation.css';
class Donation extends Component {
    render() {
        return (
            <>
                <div className="info__donation">
                후원에 대한 설명
                </div>
                <div className="donation__artist__profile">
                    <div className="artist_photo">artist_photo</div>
                    <div className="artist_name"> name </div>
                </div>
                <div className="donation_detail">
                    <ul>
                        <li className="temporary">단기 후원</li>
                        <li className="regular">정기 후원</li>
                    </ul>
                    <div className="temporary_donation hidden">
                        <span>후원금</span>
                        <input className="donation_price" type="number" />
                        <span>원</span>
                        <div className="donation_chart">

                        </div>
                    </div>
                    <div className="regular_donation ">
                        <span>후원금</span>
                        <input className="donation_price" type="number" />
                        <span>원</span>
                        <br />
                        <span>후원 주기</span>
                        <input className="donation_price" type="number" />
                        <span>개월</span>
                        <div className="donation_chart">

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Donation;