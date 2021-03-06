/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import Signup from './Signup';
import 'react-toastify/dist/ReactToastify.css';
import LoginSkeleton from './LoginSkeleton';
import Dashboard from './Dashboard';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toSign, setToSign] = useState(false);
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const axiosInstance = axios.create({
    baseURL: 'https://dutygenerator.herokuapp.com/api/v1/duties',
    timeout: 5000,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  const login = async (email, password) => {
    axiosInstance.post('https://dutygenerator.herokuapp.com/api/v1/login', { email, password }).then((response) => {
      setToken(response.data.token);
      setMessage(response.data.message);
      setError(false);
      // setSubmitted(true);
      setLogged(true);
      // const tokenParam = window.location.search;

      // // const token = tokenParam.split('=')[1];
      localStorage.setItem('token', token);

      // window.location.replace('/dashboard');

      return response;
    }).catch(() => {
      toast.error('Email is not recognised', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError(true);
      setSubmitted(false);
    });
  };

  return (

    <>
      {/* <HomeNavComponent /> */}
      {loading && error === false && <LoginSkeleton />}
      {!loading && !toSign && !logged && token === '' && (
      <section className="bg-gray-100 p-6">
        <div className="bg-white rounded-2xl items-center content-center shadow-md p-6 sm:p-2">
          <div className="items-center md:m-6 md:p-6 xs:m-2 xs:p-2">
            <h3 className="text-primary-100 text-2xl content-center text-center mt-5">LOGIN</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                //  props.OnReset(email);
                //  setSubmitted(true);
                setFormSubmit(true);

                if (email) {
                //   dispatch(reset(email));
                  // dispatch(forgotPassword(email));

                  toast.dark('Email is being Verified', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });

                  login(email, password);
                  // dispatch(forgotPassword(newState.reset.email));
                }
              }}
              className="content-center m-3 p-3 md:m-0.5 flex justify-center h-auto flex-col "
            >
              <div className="text-md content-center text-center m-2">
                <h2 className="text-gray-700 xs:text-xs">Account created - Log in</h2>
              </div>
              <div className="m-3 p-3 flex flex-col justify-center items-center">
                <input type="email" name="email" placeholder="Your email" value={email} onChange={(e) => { setEmail(e.target.value); }} className="w-1/2 sm:w-full border-primary-100 rounded content-center p-4 m-4 center shadow-md h-10 text-primary-100" />
                <input type="password" name="password" placeholder="Your password" value={password} onChange={(e) => { setPassword(e.target.value); }} className="w-1/2 sm:w-full border-primary-100 rounded content-center p-4 m-4 center shadow-md h-10 text-primary-100" />
                <button type="submit" value="Submit" name="submit" className="w-full sm:w-full border-primary-100 bg-primary-100 m-4 rounded content-center center shadow-md h-10 text-white">Login</button>
                <h6 className="text-primary-100 text-xs mb-2">or</h6>
                <button onClick={(e) => { setToSign(true); }} className="w-full sm:w-full border-primary-100 bg-primary-100 m-4 rounded content-center center shadow-md h-10 text-white">SignUp</button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </section>
      )}
      {toSign === true && <Signup /> }
      {logged && <Dashboard token={token} />}

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

export default Login;
