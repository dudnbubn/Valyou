import React from 'react';

const DonationTableElements = (props) => {
  if (props.loading) {
    return (
      <tr>
        <td colSpan="4">loading</td>
      </tr>
    );
  } else {
    let count = 0;
    return (
      props.posts.map(post => (
        <tr key={ count++}>
            <td>{post.donate_date.slice(0,10)}</td>
            <td>{((props.type==="sender")?post.receiver.nickname:post.sender.nickname)}</td>
            <td>{ post.donation}</td>
          </tr>
      ))
    )
  }
}
export default DonationTableElements;