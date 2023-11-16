import React, {useEffect} from 'react';

const Users = (props) => {
    useEffect(()=>{
        props.setTitle("Пользователи")
    })
    return (
        <div>

        </div>
    );
};

export default Users;