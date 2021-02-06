import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   addBook,
//   removeBook,
//   selectBook,
// //   incrementByAmount,
// //   incrementAsync,

// } from './bookSlice';

function Dashboard({token}) {
  // const book = useSelector(selectBook);

//   const [bookk, setBook] = useState({
//     title:'',
//     author:''
// })


// console.log(book);
useEffect(()=>{
  const axiosInstance =  axios.create({
    baseURL: "https://salbum-api.herokuapp.com/albums",
    timeout: 5000,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }); 
  axiosInstance.get('https://salbum-api.herokuapp.com/albums/',  {  headers: {
    'authorization': token,
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}}).then((response) => {
    // console.log(response);
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
},[]);

const newState = useSelector((state) => state);
const dispatch = useDispatch();
const [message, setMessage] = useState('');
const [error, setError] = useState(false);
const [album, setAblum] = useState({});
console.log(album);
const jsonfy = JSON.stringify(album);
const [songs,setSongs] = useState([{}]);
const [addAlbum, setAddAlbum]=useState('');
const [addSong, setAddSong]= useState('');
const [clickAlbum, setClickAlbum]= useState(false);
const [submitted, setSubmitted] = useState(false);
const [formSubmit, setFormSubmit] = useState(false);

  
const handleSubmit = (e) => {
    e.preventDefault();
    setAblum('');

  }
  return (
    <div>
     {/* {album ? (
    <div className="book-list">
      <ul>
         {album.map(albums => { 
          return( 
           <li key='34'>
          <div className="title">{albums.name}</div>
        </li>
         ) 
         })} 
      </ul>
    </div>
  ) : (
    <div className="empty">No books to read. Hello free time :).</div>
  )} */}

{/* { const mapping = ()=>{

}
  } */}

    <form onSubmit={handleSubmit}>
     <input type="text" name="album" placeholder="Album Name" value={album}
        onChange={(e) => setAblum(e.target.value)} class='bg-white' required />
      <input type="submit" value="add Album"/>
    </form>
    </div>
  );
}


export default Dashboard;