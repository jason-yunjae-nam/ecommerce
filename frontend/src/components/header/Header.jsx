import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "../subcomponents/SearchForm";


export default function Header({userId}) {
    const [ error, setError ] = useState(false);

    // navigation
    // TODO

    // site logo
    // TODO

    // site name
    // TODO
    
    //log out
    const logout = () => {

        axios.get("/api/logout")
        .then((res) => {
            if (res.data.loggedOut) {
                window.location.reload();
            } else {
                console.log("log-out error");
            }
        })
        .catch(err => console.log(err));   

    }

    // header block elements
    return (
        <header>
            <Link to="/products"><div>All Products</div></Link>
            <div className="category">
                <div></div>
            </div>
            <SearchForm />
            { ( userId === -1) ? 
                (
                    <div className="auth-container">
                        <Link to="/login"><div className="login-link">Sign In</div></Link>
                        <Link to="/register"><div className="register-link">Sign Up</div></Link>
                    </div>
                )
            : (userId != null) ?
            (
                <div>
                    <Link to="/users/profile"><div className = "profile-link">Account</div></Link>
                    <Link to="/">
                        <button className="logout-button" onClick={logout}>Sign Out</button>
                    </Link>
                </div>
            ) : null
            }
            <button className='cart-button' onClick={()=>setCartOpen(true)}>cart</button>
        </header>
    )

}