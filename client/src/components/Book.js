// import React, { useState } from 'react';
// import { connect,useSelector, useDispatch } from 'react-redux';
// // import {
// //   addBook,
// //   removeBook,
// //   selectBook,
// // //   incrementByAmount,
// // //   incrementAsync,

// // } from './bookSlice';

// function Book(props) {
//   // const book = useSelector(selectBook);
//   const newState = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
// //   const [bookk, setBook] = useState({
// //     title:'',
// //     author:''
// // })


// // console.log(book);

  
//  const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addBook(title,author));
//     setTitle('');
//     setAuthor('');
//   }
//   return (
//     <div>
//          {book.length ? (
//     <div className="book-list">
//       <ul>
//         {book.map(book => {
//          return(<li key={book.id} onClick={() => dispatch(removeBook(book.id))}>
//           <div className="title">{book.title}</div>
//           <div className="author">{book.author}</div>
//         </li>)
//         })}
//       </ul>
//     </div>
//   ) : (
//     <div className="empty">No books to read. Hello free time :).</div>
//   )}
//   <form onSubmit={handleSubmit}>
//   <input type="text" placeholder="book title" value={title}
//         onChange={(e) => setTitle(e.target.value)} required />
//       <input type="text" placeholder="author name" value={author}
//         onChange={(e) => setAuthor(e.target.value)} required />
//       <input type="submit" value="add book"/>
//     </form>
//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   book: state.book,
// });

// const mapDispatchToProps = (dispatch) => ({
//   addBook: (book) => dispatch(addBook(book)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Book);