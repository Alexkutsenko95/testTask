import React from 'react';
import './Item.scss';
import {Link} from 'react-router-dom';

export const Item = props => {
    let {item, deleteData} = props;
    return (
        <div className="list-group-item" data-category={item} key={item.id}>
            <div className="list-group-item-title">
                <Link className="list-group-item-link" to={`/user/${item.id}`}>
                    {item.name}
                </Link>
                {item.email}
            </div>
            <h5 className="list-group-item-delete-text" onClick={() => deleteData(item)}>
                X
            </h5>
        </div>
    )
        ;
};