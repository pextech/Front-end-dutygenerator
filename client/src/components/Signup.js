/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, useDispatch, useSelector } from 'react-redux';
// import FooterOne from '../FooterOne';
// import HomeNavComponent from '../HomeNavComponent';
import SignupSkeleton from './SignupSkeleton';
import Login from './Login';
// import { forgotPassword } from '../../store/actions/forgot';

// import {
//   reset,
// } from '../../store/actions/index';
// import ChangePassword from './ChangePassword';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [toLog, setToLog] = useState(false);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState(false);
  const [validate, setValidate] = useState(false);
  const newState = useSelector((state) => state);
  const [submitted, setSubmitted] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const dispatch = useDispatch();
  // console.log(newState.reset.email);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  const signup = async (name,email,password) => {
    axios.post('https://salbum-api.herokuapp.com/signUp', { fullnames:name, email, password }).then((response) => {
        console.log(response);
      setToken(response.data.token);
      setMessage(response.data.message);
      setError(false);
      setSubmitted(true);
      return response;
    }).catch(() => {
      setError(true);
      setSubmitted(false);
    });
  };

  return (
    <>
      {/* <HomeNavComponent /> */}
      {loading && <SignupSkeleton />}
      {!loading  && !submitted && !toLog &&(
      <section className="bg-gray-100 p-6">
        <div className="bg-white rounded-2xl items-center content-center shadow-md p-6 sm:p-2">
          <div className="items-center md:m-6 md:p-6 xs:m-2 xs:p-2">
            <h3 className="text-primary-100 text-2xl content-center text-center mt-5">Sign-Up</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                //  props.OnReset(email); 
                //  setSubmitted(true);
                 setFormSubmit(true);

                if (email) {
                //   dispatch(reset(email));
                  // dispatch(forgotPassword(email));
                  signup(name,email,password);
                  // dispatch(forgotPassword(newState.reset.email));
                }
              }}
              className="content-center m-3 p-3 md:m-0.5 flex justify-center h-auto flex-col "
            >
              <div className="text-md content-center text-center m-2">
                <h2 className="text-gray-700 xs:text-xs">Enter your Info</h2>
              </div>
              <div className="m-3 p-3 flex flex-col justify-center items-center">
              {email && password && formSubmit === true && error !== true && message && <h6 className="text-primary-100 text-xs mb-2">{message}</h6>}
              {error === true && submitted === false && <h6 className="text-red-500 text-xs mb-2">User is already registered</h6>}
                <input type="text" name="names" placeholder="Your name" value={name} onChange={(e) => { setName(e.target.value); }} className="w-1/2 sm:w-full border-primary-100 rounded content-center p-4 m-4 center shadow-md h-10 text-primary-100" />
                <input type="email" name="email" placeholder="Your email" value={email} onChange={(e) => { setEmail(e.target.value); }} className="w-1/2 sm:w-full border-primary-100 rounded content-center p-4 m-4 center shadow-md h-10 text-primary-100" />
                <input type="password" name="password" placeholder="Your password" value={password} onChange={(e) => { setPassword(e.target.value); }} className="w-1/2 sm:w-full border-primary-100 rounded content-center p-4 m-4 center shadow-md h-10 text-primary-100" />
                <button type="submit" value="Submit" name="submit" className="w-full sm:w-full border-primary-100 bg-primary-100 m-4 rounded content-center center shadow-md h-10 text-white">Sign-up</button>
                <h6 className="text-primary-100 text-xs mb-2">or</h6>
                 <button onClick={(e) => { setToLog(true)}} className="w-full sm:w-full border-primary-100 bg-primary-100 m-4 rounded content-center center shadow-md h-10 text-white">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      )}
      { submitted === true  && <Login /> }
      { toLog === true  && <Login /> }

{/* 
      <FooterOne /> */}
    </>
  );
};
// const mapStateToProps = (state) => ({
//   email: state.reset.email,
// });

// const mapDispatchToProps = (dispatch) => ({
//   OnReset: (email) => dispatch(reset(email)),
// });

export default Signup;
