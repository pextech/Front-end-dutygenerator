/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';

function Songs({ token, id, albumName }) {
  const [toLog, setToLog] = useState(false);
  // const [token, setToken] = useState('');

  const [songs, setSongs] = useState([]);
  const [addSong, setAddSong] = useState('');

  useEffect(() => {
    toast.success(`songs for ${albumName} Album`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const timer = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const add = async (addSong) => {
    const axiosInstance = axios.create({
      baseURL: 'https://salbum-api.herokuapp.com/albums',
      timeout: 5000,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    axiosInstance.post(`https://salbum-api.herokuapp.com/albums/${id}/songs`, { name: addSong }, {
      headers: {
        authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // const newAlbum = Object.entries(response.data.album);
      toast.success(`added ${response.data.song.name} in ${albumName} Album`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // setAddAlbum(response.data.token);
      setSongs(songs.concat(response.data.song));
      return response;
    }).catch(() => {
      toast.error('some problems occured', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (addSong) {
    //   dispatch(reset(email));
      // dispatch(forgotPassword(email));
      setAddSong('');
      add(addSong);
      // dispatch(forgotPassword(newState.reset.email));
    }
  };

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'https://salbum-api.herokuapp.com/albums',
      timeout: 10000,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    axiosInstance.get(`https://salbum-api.herokuapp.com/albums/${id}/songs/`, {
      headers: {
        authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      const songData = Object.entries(response.data)[2][1];

      setSongs(songData);

      return response;
    }).catch(() => {
      toast.error('some problems occured', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, []);

  const entries = Object.entries(songs);

  return (
    <div>
      { toLog === true && <Login /> }
      {toLog !== true && token !== '' && token !== null && (
      <>
        {songs.length > 0 ? (
          <div className="book-list">
            <ul>

              {entries.map((songList) => (
                <li key={songList[1].id} className="flex flex-row justify-between">
                  <div className="title">{songList[1].name}</div>

                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="empty">
            No Songs available in
            {' '}
            {` ${albumName}`}
            {' '}
            album :).
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="album"
            placeholder="Song Name"
            value={addSong}
            onChange={(e) => setAddSong(e.target.value)}
            className="bg-white focus:bg-white border-white shadow-lg "
            required
          />
          <input type="submit" value="add Song" />
        </form>
        <button
          onClick={() => { setToLog(true); }}
          className="w-full sm:w-full border-primary-100 bg-primary-100 rounded content-center center shadow-md h-10 text-white"
        >
          Logout
        </button>
      </>
      )}
      <ToastContainer />
    </div>

  );
}

export default Songs;
