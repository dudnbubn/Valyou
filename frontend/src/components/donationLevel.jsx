import React, { useEffect, useState } from 'react';
import axios from 'axios';
const DonationLevel = (props) => {
  const [artistList, setArtistList] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [donationLevel, setDonationLevel] = useState([]);

  const [posts, setPosts] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  const user_id = window.sessionStorage.getItem('id');
  
  const basicUrl = '/api/donations/detail'
  const fetchPost = async (url) => {
    axios.get(url, {
      params : { sender: user_id }
    })
      .then(res => {
      if (res.data.previous !== null) {
          setPrevious('/api/' + res.data.previous.slice(22,));
      } 
      if (res.data.next !== null) {
          setNext('/api/' + res.data.next.slice(22,));
        }
      setPosts(res.data.results);
    }).catch(error => {
        console.log(error);
    })
  };
  useEffect(() => {
    fetchPost(basicUrl);
  }, []);
  return (
    <div>

    </div>
  )
};

export default DonationLevel;