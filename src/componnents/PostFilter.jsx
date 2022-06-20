import React from 'react';
import MyInput from "./UI/Input/MyInput";
import MySelect from "./UI/Select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MySelect
                value={filter.sort}
                onChange ={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue='Sort by'
                options={[
                    {value:'title', name:'By name'},
                    {value:'body', name:'By description'},
                ]}
            />
      
            <MyInput
                value={filter.query}
                onChange={event => setFilter({...filter, query: event.target.value})}
                placeholder='Search'
            />
        </div>
    );
};

export default PostFilter;