import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import '../css/donation.css';
const Donation = () => {
    const artistNickname = useParams().artistNickname;

    const [artistPhoto, setArtistPhoto] = useState("");

    const [donationPrice, setDonationPrice] = useState(1000);
    const [isPrice, setIsPrice] = useState(false);
    const [isPeriod, setIsPeriod] = useState(false);

    const [priceMessage, setPriceMessage] = useState("");
    const [periodMessage, setPeriodMessage] = useState("");

    const [donationLevel, setDonationLevel] = useState(1);
    const [donationTotalPrice, setDonationTotalPrice] = useState(0);

    useEffect(() => {
        axios.get('/api/users/artist', {
            params: { nickname: artistNickname }
        }).then((res) => {
            console.log(res.data.results[0]);
            setArtistPhoto(res.data.results[0].artist_img);
            setDonationTotalPrice(res.data.total);
            setDonationLevel(res.data.level);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    const changeDonationPrice = (e) => {
        const price = e.target.value;
        console.log(price);
        if (price < 1000) {
            setIsPrice(false);
            setPriceMessage("1000원 이상부터 후원 가능합니다.");
        } else {
            setIsPrice(true);
            setPriceMessage("");
            setDonationPrice(price);
        }
    }
    const sendDonation = () => {
        const user_id = window.sessionStorage.getItem('id')
        axios.post('/api/donations/', {
            sender : user_id,
            receiver : artistNickname,
            price : donationPrice,
        }).then(() => {
            console.log("후원에 성공하였습니다.");
        }).catch(error => {
            console.log("후원에 실패했습니다.");
        })
    }
    return (
        <>
            <div className="info__donation">
                <div className="info__donation-1">
                    <h3>후원이란?</h3>
                    "후원 탭"을 통해 후원자님은 예술가에게 후원이 가능합니다.
                    후원자님이 후원하신 예술가가 신작을 내면 작품의 후원인단에 이름이 기재됩니다.
                </div>
                <div className="info__donation-2">
                    <h3>후원 등급이란?</h3>
                    후원등급은 후원자님이 예술가에게 후원한 금액에 따라 아래와 같은 기준으로 나누어지는 등급입니다.<br/>
                    (후원등급은 후원한 예술가 별로 매겨집니다. 즉, 5분의 예술가에게 후원하면 5개의 후원등급이 생깁니다.)<br/>
                    또한 추후 예술가가 유료작품을 낼 경우 아래와 같은 혜택을 받을 수 있습니다.
                </div>
                <div className="info__donation-3">
                    <h3>후원등급 구성 및 혜택</h3>
                    <table>
                        <th>등급</th>
                        <th>기준 금액(만원)</th>
                        <th>혜택</th>
                        <tr>
                            <td>1</td>
                            <td>0 ~ 10</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>11 ~ 30</td>
                            <td>20%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>31 ~ 50</td>
                            <td>30%</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="donation__artist__profile">
                <img src={artistPhoto} alt={artistNickname} />
            </div>
            <div className="donation_detail">
                <h3 style={{display:"block", textAlign:"center"}}>{ artistNickname}에게 후원하기</h3>
                <div className="temporary_donation">
                    <span>후원금</span>
                    <input className="donation_price" type="text" onChange={ changeDonationPrice }/>
                    <span>원</span>
                    { priceMessage};
                    <div className="donation_chart">

                    </div>
                </div>
            </div>
        </>
    );
    
}

export default Donation;