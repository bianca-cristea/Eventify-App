import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CiUser, CiLogout } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../store/actions/actions";
import { stringToColor, getInitial } from "../utils/avatarUtils";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(logOutUser(navigate));
  };

  const isAdmin = user?.roles.includes("ROLE_ADMIN");
  const isOrganizer = user?.roles.includes("ROLE_ORGANIZER");
  const isStaff = user?.roles.includes("ROLE_STAFF");
  return (
    <div className="relative z-[100]">
      <Button
        className="sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar
          sx={{
            bgcolor: stringToColor(user?.username || ""),
            fontWeight: 600,
            width: 40,
            height: 40,
          }}
        >
          {getInitial(user?.username)}
        </Avatar>
      </Button>

      <Menu
        id="fade-menu"
        slotProps={{
          list: { "aria-labelledby": "fade-button" },
          paper: { sx: { width: 160 } },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          className="flex gap-2"
          onClick={() => handleNavigate("/profile")}
        >
          <CiUser className="text-xl" />
          <span className="text-sm mt-1">{user?.username}</span>
        </MenuItem>

        {!isStaff && (
          <MenuItem
            className="flex gap-2"
            onClick={() => handleNavigate("/my-tickets")}
          >
            <IoTicketOutline className="text-xl" />
            <span className="text-sm mt-1">My Tickets</span>
          </MenuItem>
        )}

        {(isAdmin || isOrganizer) && (
          <MenuItem
            className="flex gap-2"
            onClick={() =>
              handleNavigate(isAdmin ? "/admin" : "/admin/bookings")
            }
          >
            <FaUserShield className="text-sm" />
            <span className="text-sm mt-1">
              {isAdmin ? "Admin panel" : "Organizer panel"}
            </span>
          </MenuItem>
        )}
        {isStaff && (
          <MenuItem
            className="flex gap-2"
            onClick={() => handleNavigate("/staff")}
          >
            <FaUserShield className="text-sm" />
            <span className="text-sm mt-1">Staff Dashboard</span>
          </MenuItem>
        )}
        <MenuItem className="flex gap-2" onClick={logoutHandler}>
          <div className="font-semibold w-full flex gap-2 items-center bg-blue-950 px-4 py-1 text-white rounded-sm">
            <CiLogout className="text-xl" />
            <span className="text-sm mt-1">Logout</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
