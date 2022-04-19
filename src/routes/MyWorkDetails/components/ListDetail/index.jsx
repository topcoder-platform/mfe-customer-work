import React from 'react';

import './style.scss';

const ListDetail = ({ list }) => {
  return (
    <ul className="list-detail">
      {list.map((item, index) =>
        <li key={index}>
          <div className='icon'>
            {item.icon}
          </div>
          <h4>{item.name}</h4>
          <p className='large-medium'>{item.info}</p>
        </li>
      )}
    </ul>
  );
};

export default ListDetail;