import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import BookManagement from "./components/BookManagement";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="mb-5">
          <Navigation />
        </div>
        <BookManagement className="mt-5" />
      </Router>
    </div>
  );
}

export default App;