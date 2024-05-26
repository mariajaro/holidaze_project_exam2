import { Routes, Route } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import HomePage from "../../Pages/HomePage";
import VenuePage from "../../Pages/VenuePage";
import CreateAccountPage from "../../Pages/CreateAccount";
import LoginPage from "../../Pages/LoginPage";
import Bookings from "../../Pages/Bookings";
import ProfilePage from "../../Pages/ProfilePage";
import CreateVenuePage from "../../Pages/CreateVenue";
import UpdateVenuePage from "../../Pages/UpdateVenue";
import UpdateProfilePage from "../../Pages/UpdateProfilePage";
import VenueManager from "../../Pages/VenueManagerPage";

export default function Layout() {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/venue/:id" element={<VenuePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-venue" element={<CreateVenuePage />} />
        <Route path="/update-venue/:id" element={<UpdateVenuePage />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
        <Route path="/venue-manager" element={<VenueManager />} />
      </Routes>
      <Footer />
    </div>
  );
}
