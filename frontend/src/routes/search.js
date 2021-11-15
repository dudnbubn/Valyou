import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Items from '../components/items';
import PaginateGet from '../components/paginateGet';
import '../css/search.css';

const Search = () => {
    const keyword = useParams().keyword;
    
    return (
        <div className="searching_result">
            <h3>검색결과</h3>
            <div className="professional_search">
                <h4>Professional 검색결과</h4>
                <ul className="professional_search_list">
                    <PaginateGet
                        condition={{
                            level: "pro",
                            query:keyword
                                }}
                        url={ "/api/artworks/search"}
                    />
                </ul>
            </div>
            <div className="advanced_search">
                <h4>Advanced 검색결과</h4>
                <ul className="advanced_search_list">
                    <PaginateGet
                        condition={{
                            level: "adv",
                            query:keyword
                        }}
                        url={ "/api/artworks/search"}
                    />
                </ul>
            </div>
            <div className="novice_search">
                <h4>Novice 검색결과</h4>
                <ul className="advanced_search_list">
                    <PaginateGet
                        condition={{
                            level: "nov",
                            query:keyword
                        }}
                        url={ "/api/artworks/search"}
                    />
                </ul>
            </div>
        </div>
    );    
    
}

export default Search;