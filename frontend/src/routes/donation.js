import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import '../css/donation.css';
const Donation = () => {
    const artistNickname = useParams().artistNickname;

    const [artistPhoto, setArtistPhoto] = useState("");

    const [donationType, setDonationType] = useState('temporary');
    const [donationPrice, setDonationPrice] = useState(1000);
    const [donationPeriod, setDonationPeriod] = useState(1);
    
    const [isPrice, setIsPrice] = useState(false);
    const [isPeriod, setIsPeriod] = useState(false);

    const [priceMessage, setPriceMessage] = useState("");
    const [periodMessage, setPeriodMessage] = useState("");

    const [donationLevel, setDonationLevel] = useState(1);
    const [donationTotalPrice, setDonationTotalPrice] = useState(0);

    useEffect(() => {
        axios.get('', {
            nickname:artistNickname
        }).then((res) => {
            setArtistPhoto(res.data.artistImg);
            setDonationTotalPrice(res.data.total);
            setDonationLevel(res.data.level);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    const checkDonationType = (e) => {
        const type = e.target.dataset.value;
        let anotherType = "temporary";
        if (type === "temporary") {
            anotherType = "regular";
        } else {
            anotherType = "temporary";
        }
        setDonationType(type);
        const checkDonationTypeContainer = document.querySelector(`.${type}`);
        const anotherDonationTypeConatiner = document.querySelector(`.${anotherType}`);

        if (!checkDonationTypeContainer.classList.contains('acitve')) {
            checkDonationTypeContainer.classList.add('active');
        }
        if (anotherDonationTypeConatiner.classList.contains('active')) {
            anotherDonationTypeConatiner.classList.remove('active');
        }
    }
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
    const changeDonationPeriod = (e) => {
        const period = e.target.value;
        console.log(period);
        if (period < 3) {
            setIsPeriod(false);
            setPeriodMessage("3개월 이상부터 후원 가능합니다.")
        } else {
            setIsPeriod(true);
            setPeriodMessage("");
            setDonationPeriod(period);
        }
    }
    const sendDonation = () => {
        axios.post('', {
            period: donationPeriod,
            price:donationPrice,
        }).then(() => {
            console.log("후원에 성공하였습니다.");
        }).catch(error => {
            console.log("후원에 실패했습니다.");
        })
    }
    return (
        <>
            <div className="info__donation">
            후원에 대한 설명
            </div>
            <div className="donation__artist__profile">
                <div className="artist_photo">{ artistPhoto}</div>
                <div className="artist_name"> { artistNickname} </div>
            </div>
            <div className="donation_detail">
                <ul onClick={checkDonationType}>
                    <li className="temporary active" data-value="temporary">단기 후원</li>
                    <li className="regular" data-value="regular">정기 후원</li>
                </ul>
                <div className="temporary_donation hidden">
                    <span>후원금</span>
                    <input className="donation_price" type="text" onChange={ changeDonationPrice }/>
                    <span>원</span>
                    { priceMessage};
                    <div className="donation_chart">

                    </div>
                </div>
                <div className="regular_donation ">
                    <span>후원금</span>
                    <input className="donation_price" type="number" />
                    <span>원</span>
                    <br />
                    {
                        (donationType === "regular")
                            ?
                            <>
                                <span>후원 주기</span>
                                <input className="donation_price" type="text" onChange={ changeDonationPeriod} />
                                <span>개월</span>
                                { periodMessage }
                            </>
                            :<></>
                    }
                    <div className="donation_chart">

                    </div>
                    <button type="button" onClick={sendDonation} disabled={!isPrice}>후원하기</button>
                </div>
            </div>
        </>
    );
    
}

export default Donation;