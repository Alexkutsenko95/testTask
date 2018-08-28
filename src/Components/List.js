import React, {Component} from 'react';
import {Item} from './Item';
import './List.scss'

export const List = props => {
    const {deleteData, items} = props;
    return (
        <div>
            <div className="list-group">
                {
                    items.map((item) => {
                        return <Item key={item.id} item={item} deleteData={deleteData}/>
                    })
                }
            </div>
        </div>
    )
        ;
};