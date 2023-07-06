import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '../../actions/otp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faCheckCircle } from "@fortawesome/free-solid-svg-icons"

const ChatVerification = () => {

    const [ showForm, setShowForm ] = useState(false);
    const [ otp, setOtp ] = useState('');
    const currentUser = useSelector((state) => state.currentUserReducer);
    const User = useSelector((state) => state.currentUserReducer)
    const signal = useSelector((state) => state.otpReducer)
    const navigate = useNavigate();
    // console.log(signal);
    const dispatch = useDispatch();
    const sendChatOtp = () => {
        if(!currentUser){
            alert("Please login or signup to use chat");
            navigate("/Auth");
        } else {
            setShowForm(!showForm);
            dispatch(sendOtp(User?.result._id, User?.result.email));
        }
    }

    const verifyChatOtp = (e) => {
        e.preventDefault()
        dispatch(verifyOtp(User?.result.email, otp));
    }

    const sendBack = () => {
        navigate("/");
    }

    return (
        <div className='OTP-container'>
            <div className="container">
                <h1 className='otp-icon'><FontAwesomeIcon icon={faShieldHalved} /></h1>
                You are not verified yet. <br/>
                Please Verify by using OTP.
                { !showForm ? (
                    <button className='otp-button' onClick={sendChatOtp}>Send OTP</button>
                ) : (
                    <div className='otp-form'>
                        <label ><span>OTP: </span><input type="text" onChange={(e) => { setOtp(e.target.value) }}/></label>
                        <button className='otp-button' onClick={verifyChatOtp}> 
                            {signal.sending === true ? 
                                "Sending..." 
                            : (
                                signal.verify ? (
                                    <p>Verifying....</p>
                                ) : (
                                    <p><FontAwesomeIcon icon={faCheckCircle} /> Verify</p>
                                )
                            )}
                        </button>
                        <button className='otp-button' onClick={sendBack}>Back</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatVerification