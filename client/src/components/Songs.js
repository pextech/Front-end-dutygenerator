import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';

function Songs({token,id}) {
  const newState = useSelector((state) => state);
const dispatch = useDispatch();
const [toLog, setToLog] = useState(false);
// const [token, setToken] = useState('');
const [message, setMessage] = useState('');
const [error, setError] = useState(false);
const [album, setAblum] = useState([]);

const [songs,setSongs] = useState([]);
console.log(songs);
const [addAlbum, setAddAlbum]=useState('');
const [addSong, setAddSong]= useState('');
const [clickAlbum, setClickAlbum]= useState(false);
const [submitted, setSubmitted] = useState(false);
const [formSubmit, setFormSubmit] = useState(false);





    const add = async (addSong) => {
      const axiosInstance =  axios.create({
        baseURL: "https://salbum-api.herokuapp.com/albums",
        timeout: 5000,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }); 
      axiosInstance.post(`https://salbum-api.herokuapp.com/albums/${id}/songs`, {name:addSong},{  headers: {
        'authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }}).then((response) => {
          // const newAlbum = Object.entries(response.data.album);
          console.log(album.concat(response.data.songs));

        // setAddAlbum(response.data.token);
        setAblum(album.concat(response.data.songs));
        setMessage(response.data.message);
        setError(false);
        setSubmitted(true);
        return response;
      }).catch(() => {
        setError(true);
        setSubmitted(false);
      });
    };
const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);

    if (addSong) {
    //   dispatch(reset(email));
      // dispatch(forgotPassword(email));
     setAddAlbum('');
      add(addSong);
      // dispatch(forgotPassword(newState.reset.email));
    }

}




useEffect(()=>{
  const axiosInstance =  axios.create({
    baseURL: "https://salbum-api.herokuapp.com/albums",
    timeout: 10000,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }); 
  axiosInstance.get(`https://salbum-api.herokuapp.com/albums/${id}/songs/`,  {  headers: {
    'authorization': token,
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}}).then((response) => {
      
    const songData = response.data;
    console.log(response)
      setMessage(response.data.message);
      setError(false);
      setSubmitted(true);
    //   setAblum(songData);
    //   setSongs(songData);

      return response;
    }).catch(() => {
      setError(true);
      setSubmitted(false);
    });



},[]);

const entries = Object.entries(songs);

  return (
    <div>
    { toLog === true  && <Login /> }
    {token !== '' && token !== null && (
      <>
      {songs.length > 0 ? (
    <div className="book-list">
      <ul>
      
         {entries.map(songList => { 
          return( 
          <li key={songList[1].id} className="flex flex-row justify-between" >
          <div className="title">{songList[1].name}</div>
           <ul>
             <div onClick={() => {
                        const axiosInstance =  axios.create({
                          baseURL: "https://salbum-api.herokuapp.com/albums",
                          timeout: 5000,
                          headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                          }
                        }); 
                        axiosInstance.delete(`https://salbum-api.herokuapp.com/albums/${id}/songs/${songList[1].id}`,{  headers: {
                          'authorization': token,
                          'Accept' : 'application/json',
                          'Content-Type': 'application/json'
                        }}).then((response) => {
                            const newSongs = album ? album.filter((item) => item.id !== album[1].id) : [];
                            console.log(album.filter((item) => item.id !== album[1].id));
                            console.log(!(album.includes(songList[1].id)))

                          // setAddAlbum(response.data.token);
                   
                          setAblum(newSongs);
                          setMessage(response.data.message);
                          setError(false);
                          setSubmitted(true);
                          return response;
                        }).catch(() => {
                          setError(true);
                          setSubmitted(false);
                        });
             }} className="w-6 h-6 text-sm text-white bg-primary-200 shadow-md justify-center pl-2 hover:bg-red-500">
            x
          </div>
           </ul>
          
        </li>
         ) 
         })} 
      </ul>
    </div>
  ) : (
    <div className="empty">No Songs available in this album :).</div>
  )}

    <form onSubmit={handleSubmit}>
     <input type="text" name="album" placeholder="Song Name" value={addSong}
        onChange={(e) => setAddSong(e.target.value)} className='bg-white focus:bg-white border-white shadow-lg ' required />
      <input type="submit" value="add Song"/>
    </form>
  {/* <button className="w-full sm:w-full border-primary-100 bg-primary-100 rounded content-center center shadow-md h-10 text-white">Go back</button> */}
      </>
    )}
     
    </div>
    
  );
  }


export default Songs;