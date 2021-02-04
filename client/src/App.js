import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Book from './components/Book';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
   <Navbar />
       {/* <Book /> */}
       <Signup />
    </div>
  );
}

export default App;
