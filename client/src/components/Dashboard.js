import React, { useState } from 'react';
import { connect,useSelector, useDispatch } from 'react-redux';
// import {
//   addBook,
//   removeBook,
//   selectBook,
// //   incrementByAmount,
// //   incrementAsync,

// } from './bookSlice';

function Dashboard(props) {
  // const book = useSelector(selectBook);
  const newState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [album, setAblum] = useState('');
//   const [bookk, setBook] = useState({
//     title:'',
//     author:''
// })


// console.log(book);

  
const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(addBook(title,author));
    setAblum('');

  }
  return (
    <div>
    <div className="empty">No books to read. Hello free time :).</div>
    <form onSubmit={handleSubmit}>
     <input type="text" name="album" placeholder="Album Name" value={album}
        onChange={(e) => setAblum(e.target.value)} class='bg-white' required />
      <input type="submit" value="add Album"/>
    </form>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   book: state.book,
// });

// const mapDispatchToProps = (dispatch) => ({
//   addBook: (book) => dispatch(addBook(book)),
// });

export default Dashboard;