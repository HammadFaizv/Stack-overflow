import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode'

import search from '../../assets/magnifying-glass-solid.svg';
import Avatar from '../../components/Avatar/Avatar';
import React, { useEffect, useState } from 'react';
import { Hamburger } from "./Hamburger";
import { setCurrentUser } from '../../actions/currentUser';
import { useLogo } from "../../hook/useLogo";
// import Button from '../../components/Button/Button';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showSearch, setShowSearch] = useState(false);
    const { logo, isMoblie } = useLogo();

    useEffect( () => {
        const token = User?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout();
            } 
        }
        dispatch(setCurrentUser( JSON.parse( localStorage.getItem("Profile")))) // eslint-disable-next-line
    }, [User?.token, dispatch]); 

    var User = useSelector((state) => (state.currentUserReducer));

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'});
        navigate('/');
        dispatch(setCurrentUser(null));
    }
    return (
        <nav className="main-nav">
            <div className="navbar">
                <div className="navbar-logo-con">
                    {isMoblie && <Hamburger />}
                    <Link to="/" className="nav-item nav-logo">
                        <img src={logo} alt="Flowers" width={"100%"} />
                    </Link>
                </div>
                <div className="navbar-links-con">
                    <Link to="/" className="nav-item nav-btn">
                        About
                    </Link>
                    <Link to="/" className="nav-item nav-btn">
                        Products
                    </Link>
                    <Link to="/" className="nav-item nav-btn">
                        For Teams
                    </Link>
                    <form>
                        {showSearch && <input type="text" placeholder="Search..." />}
                        <img
                        src={search}
                        alt="search"
                        className={`search-icon ${
                            showSearch ? "search-icon-active" : ""
                        }`}
                        onClick={() => setShowSearch(!showSearch)}
                        />
                    </form>
                    {User === null ? (
                        <Link
                        to="/Auth"
                        className="nav-item nav-links"
                        style={{ textDecoration: "none" }}
                        >
                        Log in
                        </Link>
                    ) : (
                        <>
                        <Avatar classname={"avatar-user-nav"}>
                            <Link
                            to={`/Users/${User?.result?._id}`}
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                            >
                            <p>{User.result.name.charAt(0).toUpperCase()}</p>
                            </Link>
                        </Avatar>
                        <button className="nav-item nav-links" onClick={handleLogout}>
                            Log out
                        </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
