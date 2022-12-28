import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();
    const clickHandler = () => {
        localStorage.removeItem('jwtoken');
        window.location.reload(); 
    }
    return (
        <div>
            <h2>This is the main page of website after logging In.</h2>
            <button onClick={clickHandler}>Logout</button>
        </div>
    )
}

export default MainPage