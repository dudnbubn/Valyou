import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DonationLevel from '../components/donationLevel';
import DonationTable from '../components/donationTable';

const ProfileMyDonation = () => {
    
    return (
        <div>
            <div className="myDonation-level">
                <h3>나의 후원 등급</h3>
                
            </div>
            <div className="myDonation-toArtist">
                <h3>내가 한 후원</h3>
                <DonationTable type="sender"/>
            </div>
            <div className="myDonation-fromSponsor">
                <h3>내가 받은 후원</h3>
                <DonationTable type="receiver"/>
            </div>
        </div>
    );
}

export default ProfileMyDonation;