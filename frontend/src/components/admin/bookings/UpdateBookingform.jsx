import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Spinners from "../../shared/Spinners";
import { useDispatch } from "react-redux";
import { updateBookingStatusFromDashboard } from "../../../store/actions/actions";
import { toast } from "react-toastify";
const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"];

const UpdateBookingform = ({
  setOpen,
  selectedId,
  selectedItem,
  loader,
  setLoader,
}) => {
  const [bookingStatus, setBookingStatus] = useState(
    selectedItem?.status || "Accepted",
  );
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const updateBookingStatus = (e) => {
    e.preventDefault();
    if (!bookingStatus) {
      setError("Booking status is required");
      return;
    }
    dispatch(
      updateBookingStatusFromDashboard(
        selectedId,
        bookingStatus,
        toast,
        setLoader,
      ),
    );
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={updateBookingStatus}>
        <FormControl fullWidth variant="outlined" error={!!error}>
          <InputLabel id="booking-status-label">Booking status</InputLabel>

          <Select
            labelId="booking-status-label"
            label="Booking status"
            value={bookingStatus}
            onChange={(e) => {
              setBookingStatus(e.target.value);
              setError("");
            }}
          >
            {BOOKING_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>

          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>

        <div className="flex w-full justify-between items-center absolute bottom-14">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-white py-[10] px-4 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-blue-950 text-white py-[10] px-4 text-sm font-medium"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Loading
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBookingform;
