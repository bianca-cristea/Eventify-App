import "./App.css";

import { Toaster } from "react-hot-toast";
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
import Bookings from "./components/admin/bookings/Bookings";
import AdminEvents from "./components/admin/events/AdminEvents";
import Organizers from "./components/admin/organizers/Organizers";
import StaffDashboard from "./components/staff/StaffDashboard";
import AIChat from "./components/AI/AIChat";

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
          <Route path="/staff" element={<StaffDashboard />} />
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
              <Route path="organizers" element={<Organizers />} />
            </Route>
          </Route>
          <Route path="/organizer" element={<PrivateRoute organizerOnly />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Bookings />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="events" element={<AdminEvents />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <AIChat />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
          },
        }}
      />
    </Router>
  );
}

export default App;
