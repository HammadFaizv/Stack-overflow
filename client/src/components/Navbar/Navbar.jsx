import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode'

import logo from '../../assets/logo.png';
import search from '../../assets/magnifying-glass-solid.svg';
import Avatar from '../../components/Avatar/Avatar';
import { useEffect } from 'react';
import { setCurrentUser } from '../../actions/currentUser';
// import Button from '../../components/Button/Button';

function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        <nav className='main-nav'>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='Logo' />
                </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                <form>
                    <input type='text' placeholder='Search...' />
                    <img src={search} alt='Q' width="18" className='search-icon' />
                </form>
                { User === null ? 
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link> :
                    <>
                        <Avatar backgroundColor='#009dff' px='12px' py='7px' borderRadius='50%' color='white'><Link to={`/Users/${User?.result._id}`} style={{color: "white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                    </>
                }
            </div>
        </nav>
    );
}

export default Navbar;
