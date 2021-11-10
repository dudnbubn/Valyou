import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate}) => {
    const pageNumber = [];
    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++){
        pageNumber.push(i);
    }
    return (
        <ul>
            {pageNumber.map(pageNum => (
                <li key={pageNum} onClick={()=>paginate(pageNum)}>
                    {pageNum}
                </li>
            ))}
        </ul>
    );
};

export default Pagination;