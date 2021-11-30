import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileMyDonation = () => {
    const [donationList, setDonationList] = useState([]);

    useEffect(() => {
        axios.get('/api/donations/detail', {
            params: {
                id: window.sessionStorage.getItem('id'),
            }
        }).then(res => {
            console.log(res.data);
            setDonationList(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    
    return (
        <div>
            <div className="myDonation-level">
                <h3>나의 후원 등급</h3>
            </div>
            <div className="myDonation-toArtist">
                <h3>내가 한 후원</h3>
            </div>
            <div className="myDonation-fromSponsor">
                <h3>내가 받은 후원</h3>
            </div>
        </div>
    );
}

export default ProfileMyDonation;