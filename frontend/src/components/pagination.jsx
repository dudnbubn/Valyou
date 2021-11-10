import React from 'react';

const Pagination = (props) => {
    const postsPerPage = props.postsPerPage;
    const totalPosts = props.totalPosts;
    const paginate = props.paginate;

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumber.push(i);
    }
    
    return (
        <ul style={{display:"flex", justifyContent:"center"}}>
            {pageNumber.map(pageNum => (
                <li key={pageNum} onClick={()=>paginate(pageNum)}>
                    {pageNum}
                </li>
            ))}
        </ul>
    );
};

export default Pagination;