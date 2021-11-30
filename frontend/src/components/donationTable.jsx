import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import DonationTableElements from './donationTableElements';

const DonationTable = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  const user_id = window.sessionStorage.getItem('id');
  
  const basicUrl = '/api/donations/detail'
  const fetchPost = async (url) => {
    axios.get(url, {
      params: 
        (props.type === 'sender') ? { sender: user_id } : { receiver: user_id }
    })
      .then(res => {
      console.log(res.data);
      if (res.data.previous !== null) {
          setPrevious('/api/' + res.data.previous.slice(22,));
      } 
      if (res.data.next !== null) {
          setNext('/api/' + res.data.next.slice(22,));
      } 
      setPosts(res.data.results);
      setLoading(false);
    }).catch(error => {
        console.log(error);
    })
  };
  useEffect(() => {
    fetchPost(basicUrl);
  }, []);
  const goToPrePage = () => {
      fetchPost(previous);
  }
  const goToNextPage = () => {
      fetchPost(next);
  }
  
  return (
    <div className={"donation__"+props.type+"__wrap"}>
      <table>
        <thead>
          <tr>
            <th style={{width:"30%"}}>날짜</th>
            <th style={{width:"40%"}}>{(props.type === 'sender') ? "내가 후원한 예술가" : "후원인"}</th>
            <th style={{width:"30%"}}>후원 액</th>
          </tr>
        </thead>
        <tbody>
          <DonationTableElements type={props.type} loading={loading} posts={posts} />
        </tbody>
        
      </table>
        <div className="pagination__btns" style={{display:"flex", justifyContent:"center"}}>
            <button className="paginate__btn-pre" onClick={goToPrePage}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </button>
            <button className="paginate__btn-next" onClick={ goToNextPage}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
        
    </div>
  );
}

export default DonationTable;