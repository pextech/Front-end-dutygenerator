/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import Songs from './Songs';

function Dashboard({ token }) {
  const newState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toLog, setToLog] = useState(false);
  // const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [album, setAblum] = useState([]);

  const [albumName, setAlbumName] = useState('');
  const [songs, setSongs] = useState([]);
  const [addAlbum, setAddAlbum] = useState('');
  const [addSong, setAddSong] = useState('');
  const [clickAlbum, setClickAlbum] = useState(false);
  const [clickId, setClickId] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const add = async (addAlbum) => {
    const axiosInstance = axios.create({
      baseURL: 'https://salbum-api.herokuapp.com/albums',
      timeout: 5000,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    axiosInstance.post('https://salbum-api.herokuapp.com/albums', { name: addAlbum }, {
      headers: {
        authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // const newAlbum = Object.entries(response.data.album);
      toast.success(`added ${response.data.album.name} successfully`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setAddAlbum(response.data.token);
      setAblum(album.concat(response.data.album));
      setMessage(response.data.message);
      setError(false);
      setSubmitted(true);
      return response;
    }).catch(() => {
      toast.success('some problems occurred', {
        position: 'top-right',
        autoClose: 3000,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);

    if (addAlbum) {
    //   dispatch(reset(email));
      // dispatch(forgotPassword(email));
      setAddAlbum('');
      add(addAlbum);
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
    axiosInstance.get('https://salbum-api.herokuapp.com/albums/', {
      headers: {
        authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      toast.success('your albums', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const albumData = response.data.userAlbums[0].albums;
      setMessage(response.data.message);
      setError(false);
      setSubmitted(true);
      setAblum(albumData);
      return response;
    }).catch(() => {
      setError(true);
      setSubmitted(false);
    });
  }, []);

  const entries = Object.entries(album);

  return (
    <div>
      { toLog === true && <Login /> }
      {toLog !== true && clickAlbum === true
        && <Songs id={clickId} token={token} albumName={albumName} />}
      {toLog !== true && clickAlbum === false && token !== '' && token !== null && (
      <>
        {album.length > 0 ? (
          <div className="book-list">
            <ul>

              {entries.map((albums) => (
                <li key={albums[1].id} className="flex flex-row justify-between">

                  <div
                    className="title"
                    onClick={() => {
                      setClickAlbum(true);
                      setClickId(albums[1].id);
                      setAlbumName(albums[1].name);
                    }}
                  >
                    {albums[1].name}
                  </div>
                  <ul>
                    <div
                      onClick={() => {
                        const axiosInstance = axios.create({
                          baseURL: 'https://salbum-api.herokuapp.com/albums',
                          timeout: 5000,
                          headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                          },
                        });
                        axiosInstance.delete(`https://salbum-api.herokuapp.com/albums/${albums[1].id}`, {
                          headers: {
                            authorization: token,
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        }).then((response) => {
                          toast.success('deleted Album', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                          const newAlbum = album ? album.filter((item) => item.id !== album[1].id) : [];

                          // setAddAlbum(response.data.token);

                          setAblum(newAlbum);
                          setMessage(response.data.message);
                          setError(false);
                          setSubmitted(true);
                          return response;
                        }).catch(() => {
                          setError(true);
                          setSubmitted(false);
                        });
                      }}
                      className="w-6 h-6 text-sm text-white bg-primary-200 shadow-md justify-center pl-2 hover:bg-red-500"
                    >
                      x
                    </div>
                  </ul>

                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="empty">No Albums available for you:).</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="album"
            placeholder="Album Name"
            value={addAlbum}
            onChange={(e) => setAddAlbum(e.target.value)}
            className="bg-white focus:bg-white border-white shadow-lg "
            required
          />
          <input type="submit" value="add Album" />
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

export default Dashboard;
