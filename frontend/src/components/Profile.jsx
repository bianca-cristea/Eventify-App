import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CiUser, CiLock } from "react-icons/ci";

import {
  fetchMyProfile,
  updateMyProfile,
  changePassword,
  fetchMyBookings,
} from "../store/actions/actions";

const statusStyles = {
  CONFIRMED: "bg-emerald-500/20 text-emerald-300",
  PENDING: "bg-yellow-500/20 text-yellow-300",
  CANCELLED: "bg-rose-500/20 text-rose-300",
};

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { myBookings } = useSelector((state) => state.bookings);

  const [email, setEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    dispatch(fetchMyProfile());
    dispatch(fetchMyBookings());
  }, []);

  useEffect(() => {
    if (profile?.email) setEmail(profile.email);
  }, [profile]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await dispatch(updateMyProfile({ email }, toast));
    } catch (error) {
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setSavingPassword(true);
    try {
      await dispatch(changePassword({ oldPassword, newPassword }, toast));
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-4 flex justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-white/50 text-sm mt-1">
            Manage your account details and view your booking history.
          </p>
        </div>

        <section className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CiUser className="text-xl" /> Account details
          </h2>

          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-white/60 text-sm block mb-1">
                Username
              </label>
              <input
                type="text"
                value={profile?.username || ""}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 cursor-not-allowed"
              />
              <p className="text-white/30 text-xs mt-1">
                Username cannot be changed.
              </p>
            </div>

            <div>
              <label className="text-white/60 text-sm block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="self-start px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {savingProfile ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>

        {/* Schimbare parola */}
        <section className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CiLock className="text-xl" /> Change password
          </h2>

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-white/60 text-sm block mb-1">
                Current password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400 transition"
              />
            </div>

            <div>
              <label className="text-white/60 text-sm block mb-1">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={4}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400 transition"
              />
            </div>

            <div>
              <label className="text-white/60 text-sm block mb-1">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={4}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="self-start px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {savingPassword ? "Updating..." : "Update password"}
            </button>
          </form>
        </section>

        {/* Istoric comenzi/plati */}
        <section className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Order history
          </h2>

          {!myBookings || myBookings.length === 0 ? (
            <p className="text-white/50 text-sm">
              You haven't made any bookings yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {myBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="border border-white/10 rounded-xl p-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      Booking #{booking.bookingId}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[booking.status] ||
                        "bg-white/10 text-white/60"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <p className="text-white/50 text-xs">
                    {new Date(booking.bookingDate).toLocaleDateString("ro-RO", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  {booking.bookingItems?.map((item, idx) => (
                    <p key={idx} className="text-white/70 text-sm">
                      {item.eventTitle} — {item.ticketType} x{item.quantity}
                    </p>
                  ))}

                  <div className="flex justify-end">
                    <span className="text-indigo-300 font-bold">
                      ${booking.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
