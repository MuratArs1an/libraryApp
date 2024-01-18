import { Route, BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import BookManagement from "./components/BookManagement";
import { SearchProvider } from "../src/components/SearchContext";
import { CartProvider } from "./components/CartContext";
import { useState } from "react";


function App() {
    const [showCartList, setShowCartList] = useState(false);

    return (
        <div className="App">
            <Router>
                <SearchProvider>
                    <CartProvider>
                        <div className="mb-5">
                            <Navigation showCartList={showCartList} setShowCartList={setShowCartList} />
                        </div>
                        <BookManagement  showCartList={showCartList} className="mt-5" />
                    </CartProvider>
                </SearchProvider>
            </Router>
        </div>
    );
}

export default App;