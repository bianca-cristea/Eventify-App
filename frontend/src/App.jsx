import "./App.css";

import { ToastContainer } from "react-toastify";
import Home from "./components/home/Home";
import Events from "./components/events/Events";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/cart/Cart";
import LogIn from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import MyTickets from "./components/MyTickets";
import Profile from "./components/Profile";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Categories from "./components/admin/categories/Categories";

import Sellers from "./components/admin/sellers/Sellers";
import Bookings from "./components/admin/bookings/Bookings";
import AdminEvents from "./components/admin/events/AdminEvents";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirm" element={<PaymentConfirmation />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<PrivateRoute adminOnly />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="categories" element={<Categories />} />
              <Route path="sellers" element={<Sellers />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
