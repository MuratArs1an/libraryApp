import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import BookManagement from "./components/BookManagement";
import { SearchProvider } from "../src/components/SearchContext";


function App() {
    return (
        <div className="App">
            <Router>
                <SearchProvider>
                    <div className="mb-5">
                        <Navigation />
                    </div>
                    <BookManagement className="mt-5" />
                </SearchProvider>
            </Router>
        </div>
    );
}

export default App;