import './App.css';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import {useState,useEffect} from "react"
import axios from 'axios';
import Navigation from './components/Navigation';

function App() {

  const[books,setBooks]=useState([]);

  //update edilecek book için state
  const [selectedBook, setSelectedBook] = useState(null);

  //state her değiştiğine refresh olması için
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/book');
        setBooks(response.data);
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const addBook = async(newBook) => {
    try{

      //yeni kitap eklemek için post request attık
      const response=await axios.post('http://localhost:3000/book', newBook);

      //statemizi yeni data ile update ettik
      setBooks((prevBooks) => [...prevBooks, response.data]);
    }catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const removeBook =async (index) => {
    try {
      const bookId = books[index]._id;
      await axios.delete(`http://localhost:3000/book/${bookId}`);
      setBooks((prevBooks) => {
        const updatedBooks = [...prevBooks];
        updatedBooks.splice(index, 1);
        return updatedBooks;
      });
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  const updateBook = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="App">
      <Navigation />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mt-5">
            <BookForm addBook={addBook} selectedBook={selectedBook} updateBook={updateBook} />
          </div>
          <div className="col-md-8 mt-5">
            <BookList books={books} removeBook={removeBook} updateBook={updateBook} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
