/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { Link, RichText, Date } from 'prismic-reactjs';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';

function Dashboard({ token }) {
  const [toLog, setToLog] = useState(false);
  // const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [duty, setDuty] = useState([]);

  const [dutyName, setDutyName] = useState('');
  const [addTitle, setAddTitle] = useState('');
  const [addDescr, setAddDescr] = useState('');
  const [addPriority, setAddPriority] = useState('');
  const [addtime, setAddTime] = useState('');

  const [clickDuty, setClickDuty] = useState(false);
  const [clickDescr, setClickDescr] = useState('');
  const [clickId, setClickId] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const add = async (addPriority, addTitle, addDescr) => {
    const axiosInstance = axios.create({
      baseURL: 'https://dutygenerator.herokuapp.com/api/v1/duties',
      timeout: 5000,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    if (addTitle.length < 6) {
      toast.error('title too short(6 digits min)', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (addDescr.length < 50) {
      toast.error('Description too short(100 words min)', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (addDescr.length >= 50 && addTitle.length >= 6) {
      axiosInstance.post('https://dutygenerator.herokuapp.com/api/v1/duties', { title: addTitle, description: addDescr, priority: addPriority }, {
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
      // const newAlbum = Object.entries(response.data.album);
        toast.dark(`added ${response.data.duty.title} successfully`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setAddAlbum(response.data.token);
        setDuty(duty.concat(response.data.duty));
        setMessage(response.data.message);
        setError(false);
        setSubmitted(true);
        setAddDescr('');
        setAddTitle('');
        return response;
      }).catch(() => {
        toast.error('some problems occurred', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setError(true);
        setSubmitted(false);
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    //   dispatch(reset(email));
    // dispatch(forgotPassword(email));
    add(addPriority, addTitle, addDescr);
  };

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'https://dutygenerator.herokuapp.com/api/v1/duties',
      timeout: 10000,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    axiosInstance.get('https://dutygenerator.herokuapp.com/api/v1/duties', {
      headers: {
        authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      const dutyData = response.data.userDuties[0].duties;
      setMessage(response.data.message);
      setError(false);
      setSubmitted(true);
      setDuty(dutyData);
      toast.dark(`you have ${Object.entries(response.data.userDuties[0].duties).length} Duties`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return response;
    }).catch(() => {
      setError(true);
      setSubmitted(false);
    });
  }, []);
  if (clickDuty === true && clickId) {
    toast.dark(`${clickDescr}`, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const entries = Object.entries(duty);
  return (
    <div>
      { toLog === true && <Login /> }
      {/* {toLog !== true && clickDuty === true
        && <Songs id={clickId} token={token} albumName={dutyName} />} */}
      {toLog !== true && token !== '' && token !== null && (
      <>
        {duty.length > 0 ? (
          <div className="book-list">
            <ul>

              {entries.map((duties) => (
                <li key={duties[1].id} className="flex flex-row justify-between sm:flex-col sm:p-3 sm:m-3">
                  <div
                    className="text-sm sm:p-1 sm:m-1 hover:text-red-400"
                    onClick={() => {
                      setClickDuty(true);
                      setClickId(duties[1].id);
                      setDutyName(duties[1].title);
                      setClickDescr(duties[1].description);
                    }}
                  >
                    {duties[1].title}
                  </div>
                  <div
                    className="text-sm sm:p-1 sm:m-1"
                  >
                    {duties[1].priority}
                  </div>
                  <div
                    className="text-sm sm:p-1 sm:m-1"
                  >
                    {moment(duties[1].createdAt).utc().format('YYYY-MM-DD')}
                  </div>
                  <ul>
                    <div
                      onClick={() => {
                        setClickDuty(false);
                        const axiosInstance = axios.create({
                          baseURL: 'https://dutygenerator.herokuapp.com/api/v1/duties',
                          timeout: 5000,
                          headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                          },
                        });
                        axiosInstance.delete(`https://dutygenerator.herokuapp.com/api/v1/duties/${duties[1].id}`, {
                          headers: {
                            authorization: token,
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        }).then((response) => {
                          toast.dark('deleted Duty', {
                            position: 'top-right',
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                          if (duty.length <= 1) {
                            setDuty([]);
                          }
                          const newDuty = duty ? duty.filter((item) => item.id !== duty[1].id) : [];

                          // setAddAlbum(response.data.token);

                          setDuty(newDuty);
                          setMessage(response.data.message);
                          setError(false);
                          setSubmitted(true);
                          return response;
                        }).catch(() => {
                          setError(true);
                          setSubmitted(false);
                        });
                      }}
                      className="w-6 h-6 text-sm text-white bg-primary-200 shadow-md justify-center pl-2 hover:bg-red-500 sm:m-1"
                    >
                      x
                    </div>
                  </ul>

                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="empty text-gray-800">No Duties available for you:).</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="duty Title"
            value={addTitle}
            onChange={(e) => { setClickDuty(false); setAddTitle(e.target.value); }}
            className="bg-white focus:bg-white border-white shadow-lg "
            required
          />
          <textarea
            rows="5"
            cols="80"
            type="text"
            name="description"
            placeholder="Duty Description"
            value={addDescr}
            onChange={(e) => { setClickDuty(false); setAddDescr(e.target.value); }}
            className="bg-white focus:bg-white border-white shadow-lg "
            required
          />
          <p className="ml-3 text-xs text-gray-600">Hint: 50 minimum characters</p>
          <select value={addPriority} onChange={(e) => { setClickDuty(false); setAddPriority(e.target.value); }} className="bg-white focus:bg-gray-200 border-gray shadow-lg text-gray-500 rounded-sm">
            <option>Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="submit" className="hover:bg-gray-600" value="add Duty" />
        </form>
        <button
          onClick={() => { setToLog(true); setClickDuty(false); }}
          className="w-full sm:w-full border-primary-100 bg-primary-100 hover:bg-gray-700 content-center center shadow-md h-10 text-white"
        >
          Logout
        </button>
      </>
      )}
      <ToastContainer />
    </div>

  );
}

export default Dashboard;
