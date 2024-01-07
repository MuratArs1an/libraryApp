import './App.css';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import {useState} from "react"


function App() {
  const[books,setBooks]=useState([
    {
        title:"The Lord Of the Rings",
        author:"J.R.R Tolkien",
        pages:650,
        stock:3
    },
    {
      title:"Doctor Sleep",
      author:"Stephen King",
      pages:380,
      stock:1
  }
  ])

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const removeBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  return (
    <div className="App">
      LibraryApp
      <div>
        <BookForm addBook={addBook} />
        <div>
          <BookList books={books} removeBook={removeBook}/>
        </div>
      </div>
    </div>
  );
}

export default App;
