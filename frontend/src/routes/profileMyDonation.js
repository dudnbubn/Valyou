import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';

const ProfileMyDonation = () => {
    const [donationList, setDonationList] = useState([]);

    useEffect(() => {
        axios.get('', {
            
        }).then(res => {
            setDonationList(res.data);
        }).catch((error) => {
            console.log(error);
        })
    })
    return (
        <div>

        </div>
    );
}

export default ProfileMyDonation;