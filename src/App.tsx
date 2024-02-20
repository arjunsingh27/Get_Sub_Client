import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/shared/Header/Header";
import Footer from "./components/shared/Footer/Footer";
import Home from "./pages/Home";
import Products from "./pages/ProductList";
import Login from "./components/auth/Login";
import Cart from "./components/cart/Cart";
import Register from "./components/auth/Register";
import OrderHistory from "./components/order/OrderHistory";
import OrderDetails from "./components/order/OrderDetails";
import ProductDetail from "./components/productlist/ProductDetail";
import CheckOut from "./components/cart/CheckOut";
import { useStateValue } from "./StateProvider"; // Import your state provider

const App = () => {
  const [{}, dispatch] = useStateValue(); // Destructure the state value from your state provider

  useEffect(() => {
    const user = sessionStorage.getItem("currentUser"); // Access user data from sessionStorage
    if (user) {
      dispatch({
        type: "SET_CURRENT_USER",
        user: JSON.parse(user),
      });
    }
  }, [dispatch]); // Add dispatch to the dependency array

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
