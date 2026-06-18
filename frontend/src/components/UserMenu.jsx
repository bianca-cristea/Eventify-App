import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Backdrop from "./Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../store/actions/actions";

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
  const logoutHandler = () => {
    dispatch(logOutUser(navigate));
  };

  return (
    <div className="relative z-30">
      <Button
        className="  sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar src="/broken-image.jpg" alt="Menu" />
      </Button>
      <Menu
        sx={{ width: "250px" }}
        id="fade-menu"
        slotProps={{
          list: {
            "aria-labelledby": "fade-button",
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: 160,
            },
          },
        }}
      >
        <Link to="/">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <CiUser className="text-xl" />
            <span className="text-[16] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>
        <Link to="/my-tickets">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <IoTicketOutline className="text-xl" />
            <span className="text-[16] mt-1">My Tickets</span>
          </MenuItem>
        </Link>

        <MenuItem className="flex gap-2" onClick={logoutHandler}>
          <div className="font-semibold w-full flex gap-2 items-center bg-blue-950 px-4 py-1 text-white rounded-sm">
            <CiLogout className="text-xl" />
            <span className="text-[16] mt-1">Logout</span>
          </div>
        </MenuItem>
      </Menu>
      {open && <Backdrop />}
    </div>
  );
};

export default UserMenu;
